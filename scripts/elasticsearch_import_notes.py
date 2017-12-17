#!/usr/bin/env python
#
# Query Notes in GraphQL and import them into Elasticsearch.
#
import requests
import json
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

url = 'http://strangway.thehoick.com/graphql'
# url = 'http://localhost:4000/graphql'

login = {
    "operationName": "Login",
    "variables": {"username": os.environ.get("USER"), "password": os.environ.get("PASS")},
    "query": "mutation Login($username: String, $password: String) { login(username: $username, password: $password) { id username updatedAt } }"
}

folders_query = {
 "query": "{  folders {    id    name    __typename  }}"
}

login_req = requests.post(url, json=login)

req = requests.post(url, json=folders_query, cookies=login_req.cookies)
folders = json.loads(req.text)

for folder in folders['data']['folders']:
    print(folder['name'])

    folder_notes = {
        "operationName": "FolderQuery",
        "variables": {"id": folder['id']},
        "query": "query FolderQuery($id: Int) {  folder(id: $id) {id name notes {      id      name      content      folderId      createdAt      updatedAt     }  }}"
    }

    req = requests.post(url, json=folder_notes, cookies=login_req.cookies)
    notes = json.loads(req.text)

    for note in notes['data']['folder']['notes']:
        print("\t", note['name'])

        elasticurl = 'http://' + os.environ.get('ELASTICSEARCH') + ':9200/notes/default/' + str(note['id'])
        req = requests.put(elasticurl, json=note)
