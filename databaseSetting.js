const configDB = function(db){
db.serialize(() => {db.run(`

CREATE TABLE Themes (
	theme_id INTEGER PRIMARY KEY,
	theme CHAR(20) NOT NULL UNIQUE
);

`, err => {if (err) throw err}).run(`

INSERT INTO Themes (theme) VALUES ('English');

`, err => {if (err) throw err}).run(`

CREATE TABLE Dates (
	date_id INTEGER PRIMARY KEY,
	date_int INTEGER NOT NULL UNIQUE
);

`, err => {if (err) throw err}).run(`

INSERT INTO Dates (date_int) VALUES (strftime('%d.%m.%Y','now'));

`, err => {if (err) throw err}).run(`

CREATE TABLE Users (
	user_id INTEGER PRIMARY KEY,
	session INT DEFAULT 1,
	user_name CHAR(20) NOT NULL UNIQUE,
	email TEXT NOT NULL UNIQUE,
	theme_id INTEGER,
	date_id INTEGER,
	FOREIGN KEY (theme_id) REFERENCES Themes(theme_id),
	FOREIGN KEY (date_id) REFERENCES Dates(date_id)
);

`, err => {if (err) throw err}).run(`

INSERT INTO Users (user_name, email) VALUES ('Animatoria', 'nn.animatoria@gmail.com');

`, err => {if (err) throw err}).run(`

CREATE TABLE Users_Themes (
	user_id INTEGER NOT NULL,
	theme_id INTEGER NOT NULL,
	PRIMARY KEY (user_id, theme_id),
	FOREIGN KEY (user_id) REFERENCES Users(user_id),
	FOREIGN KEY (theme_id) REFERENCES Themes(theme_id)
);

`, err => {if (err) throw err}).run(`

INSERT INTO Users_Themes (user_id, theme_id) VALUES (1, 1);

`, err => {if (err) throw err}).run(`

CREATE TABLE Themes_Dates (
	theme_id INTEGER NOT NULL,
	date_id INTEGER NOT NULL,
	PRIMARY KEY (theme_id, date_id),
	FOREIGN KEY (theme_id) REFERENCES Themes(theme_id),
	FOREIGN KEY (date_id) REFERENCES Dates(date_id)
);

`, err => {if (err) throw err}).run(`

INSERT INTO Themes_Dates (theme_id, date_id) VALUES (1, 1);

`, err => {if (err) throw err}).run(`

CREATE TABLE Animatoria (
	deleted INTEGER DEFAULT 0,
	face TEXT,
	back TEXT,
	theme_id INTEGER NOT NULL,
	date_id INTEGER NOT NULL,
	FOREIGN KEY (theme_id) REFERENCES Themes(theme_id),
	FOREIGN KEY (date_id) REFERENCES Dates(date_id)
);

`, err => {if (err) throw err}).run(`

INSERT INTO Animatoria (face, back, theme_id, date_id) VALUES ('First card face', 'First card back', 1, 1);

`, err => {if (err) throw err}).each(`

SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;

`, (err, row) => {
	if (err) throw err;
	console.log(row.name);
}).all(`

SELECT * FROM Users;

`, (err, row) => {
	if (err) throw err;
	console.log(row);
}).all(`

SELECT * FROM Themes;

`, (err, row) => {
	if (err) throw err;
	console.log(row);
}).all(`

SELECT * FROM Dates;

`, (err, row) => {
	if (err) throw err;
	console.log(row);
}).all(`

SELECT * FROM Animatoria;

`, (err, row) => {
	if (err) throw err;
	console.log(row);
}).all(`

SELECT * FROM Users_Themes;

`, (err, row) => {
	if (err) throw err;
	console.log(row);
}).all(`

SELECT * FROM Themes_Dates;

`, (err, row) => {
	if (err) throw err;
	console.log(row);
})
});};

module.exports = configDB;