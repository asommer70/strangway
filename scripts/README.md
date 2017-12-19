# Strangway Scripts

These are some Python scripts to manipulate Notes, Folders, etc.  

Cause why not mix in some Python into a Node.js web app?


## Query on Note.name and Note.content

```
GET /notes/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {"name": "12"}},
        {"match": {"content": "Strangway"}}
      ]
    }
  }
}
```
