create TABLE person(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(20), 
    name VARCHAR(20),
    surname VARCHAR(20),
    password VARCHAR(20),
    UNIQUE (userName)
);

create TABLE post(
    id_post SERIAL PRIMARY KEY,
    title VARCHAR(20),
    content TEXT,
    user_id INTEGER,
    date DATA,
    FOREIGN KEY (user_id) REFERENCES person(id)
);
