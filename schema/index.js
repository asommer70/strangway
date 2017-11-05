const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;
const Folder = new require('../models/folder')();
const Note = new require('../models/note')();

const FolderType = new GraphQLObjectType({
  name: 'Folder',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parentValue, args) {
        return parentValue.notes()
          .then((notes) => {
            return notes;
          });
      }
    }
  })
});

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    content: { type: GraphQLString },
    folderId: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    folder: {
      type: FolderType,
      resolve(parentValue, args) {
        return Folder.findById(parentValue.folderId)
          .then((folder) => {
            return folder;
          });
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    folder: {
      type: FolderType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return Folder.findById(args.id)
          .then((folder) => {
            return folder;
          });
      }
    },

    folders: {
      type: new GraphQLList(FolderType),
      resolve(parentValue, args) {
        return Folder.findAll()
          .then((folders) => {
            return folders;
          });
      }
    },

    note: {
      type: NoteType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return Note.findById(args.id)
          .then((note) => {
            return note;
          });
      }
    },

    notes: {
      type: new GraphQLList(NoteType),
      resolve(parentValue, args) {
        return Note.findAll()
          .then((notes) => {
            return notes;
          });
      }
    },
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addFolder: {
      type: FolderType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return Folder.create(args.name)
      }
    },

    deleteFolder: {
      type: FolderType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return Folder.findById(args.id)
          .then((folder) => {
            return folder.delete();
          })
      }
    },

    editFolder: {
      type: FolderType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return Folder.findById(args.id)
          .then((folder) => {
            folder.name = args.name;
            return folder.save();
          });
      }
    },

    addNote: {
      type: NoteType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLString },
        folderId: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return Note.create({name: args.name, content: args.content, folderId: args.folderId})
      }
    },

    deleteNote: {
      type: NoteType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return Note.findById(args.id)
          .then((note) => {
            return note.delete();
          })
      }
    },

    editNote: {
      type: NoteType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        content: { type: GraphQLString },
        folderId: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return Note.findById(args.id)
          .then((note) => {
            note.name = (args.name != null) ? args.name : note.name;
            note.content = (args.content != null) ? args.content : note.content;
            note.folderId = (args.folderId != null) ? args.folderId : note.folderId;
            return note.save();
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
