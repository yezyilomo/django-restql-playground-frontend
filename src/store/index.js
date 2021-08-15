import { store } from 'state-pool'


function initializeStore() {
    store.setState("GET", {
        model: "",
        pk: "",
        query: ""
    })

    store.setState("POST", {
        model: "",
        query: "",
        payload: ""
    })

    store.setState("PUT", {
        model: "",
        pk: "",
        query: "",
        payload: ""
    })

    store.setState("PATCH", {
        model: "",
        pk: "",
        query: "",
        payload: ""
    })

    store.setState("models", [
        ["genres", "Genre"],
        ["phones", "Phone"],
        ["books", "Book"],
        ["courses", "Course"],
        ["students", "Student"]
    ])

    const DEFAULT_QUERIES = {
"genres": 
`{
    id,
    title,
    description
}`,

"phones": 
`{
    id,
    number,
    type,
    student
}`,

"books": 
`{
    id,
    title,
    author,
    genre {
        id,
        title,
        description
    }
}`,

"courses": 
`{
    id,
    name,
    code,
    books {
        id,
        title,
        author,
        genre {
            id,
            title,
            description
        }
    }
}`,

"students": 
`{
    id,
    name,
    age,
    course {
        id,
        name,
        code,
        books {
            id,
            title,
            author,
            genre {
                id,
                title,
                description
            }
        }
    }
}`
    }

    store.setState("DEFAULT_QUERIES", DEFAULT_QUERIES)

    const DEFAULT_PAYLOADS = {
"genres": 
`{
    "title": "",
    "description": ""
}`,

"phones": 
`{
    "number": "",
    "type": "",
    "student": ""
}`,

"books": 
`{
    "title": "",
    "author": "",
    "genre": {
        "title": "",
        "description": ""
    }
}`,

"courses": 
`{
    "name": "",
    "code": "",
    "books": {
        "create": [],
        "add": [],
    }
}`,

"students": 
`{
    "name": "",
    "age": "",
    "course": {
        "name": "",
        "code": "",
        "books" {
            "create": [],
            "add": []
        }
    }
}`
    }

    store.setState("DEFAULT_PAYLOADS", DEFAULT_PAYLOADS)
}

export { initializeStore };