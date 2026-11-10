// SQL & Databases course. Examples use standard SQL that runs on MySQL/PostgreSQL;
// differences are called out where they matter.
const md = String.raw;

const MODULES = [
  {
    id: "sql1",
    title: "Introduction to Databases",
    summary: "What databases are, how relational tables work and what SQL does.",
    lessons: [
      {
        title: "What is a database?",
        minutes: 15,
        body: md`A **database** is an organised collection of data that can be stored, searched and updated efficiently. A **DBMS** (Database Management System) is the software that manages it.

### Why not just use Excel?
- Many users can read and write **at the same time** safely.
- Data stays **consistent** — rules prevent invalid values.
- Handles millions of rows quickly with **indexes**.
- Fine-grained **security** and automatic **backups**.

### Types of databases
- **Relational (SQL)** — data in tables with relationships: MySQL, PostgreSQL, Oracle, SQL Server, SQLite
- **NoSQL** — documents, key-value, graphs: MongoDB, Redis, Cassandra, Neo4j

Almost every app you use — banking, food delivery, college ERP — has a relational database behind it.`,
      },
      {
        title: "Tables, rows, columns and keys",
        minutes: 15,
        body: md`A relational database stores data in **tables**.
~~~
students
+----+---------+------+------+
| id | name    | dept | cgpa |
+----+---------+------+------+
|  1 | Asha    | CSE  |  8.9 |
|  2 | Ravi    | ECE  |  7.6 |
|  3 | Divya   | CSE  |  9.2 |
+----+---------+------+------+
~~~
- **Column** (field/attribute) — one kind of data, with a data type
- **Row** (record/tuple) — one item, e.g. one student

### Keys
- **Primary key** — uniquely identifies each row («id»). It can't be NULL or repeat.
- **Foreign key** — a column that refers to a primary key in another table, creating a **relationship**:
~~~
marks(student_id → students.id, subject, score)
~~~
- **Candidate key** — any column set that could be a primary key (e.g. email, roll number).`,
      },
      {
        title: "What SQL does",
        minutes: 15,
        body: md`**SQL** (Structured Query Language) is the standard language for relational databases. It's **declarative** — you describe *what* you want, and the database figures out *how*.
~~~sql
SELECT name, cgpa
FROM students
WHERE dept = 'CSE'
ORDER BY cgpa DESC;
~~~

### SQL command categories
- **DDL** (Data Definition) — «CREATE», «ALTER», «DROP», «TRUNCATE»
- **DML** (Data Manipulation) — «INSERT», «UPDATE», «DELETE»
- **DQL** (Data Query) — «SELECT»
- **DCL** (Data Control) — «GRANT», «REVOKE»
- **TCL** (Transaction Control) — «COMMIT», «ROLLBACK», «SAVEPOINT»

### Practising
Install **MySQL** or **PostgreSQL**, or use **SQLite** / an online SQL playground. Keywords are case-insensitive, but writing them in UPPERCASE makes queries easier to read. End statements with «;».`,
      },
    ],
    quiz: [
      { q: "What uniquely identifies each row in a table?", options: ["Foreign key", "Primary key", "Index", "Column name"], answer: 1, explain: "A primary key is unique and not NULL." },
      { q: "Which command category does SELECT belong to?", options: ["DDL", "DML", "DQL", "DCL"], answer: 2, explain: "SELECT is a data query statement." },
      { q: "A column that references another table's primary key is a…", options: ["Primary key", "Foreign key", "Super key", "Unique key"], answer: 1, explain: "Foreign keys create relationships." },
      { q: "Which is a relational database?", options: ["MongoDB", "Redis", "PostgreSQL", "Neo4j"], answer: 2, explain: "PostgreSQL stores data in related tables." },
      { q: "SQL is described as declarative because…", options: ["You write step-by-step loops", "You describe what data you want, not how to get it", "It only declares variables", "It can't modify data"], answer: 1, explain: "The database engine decides how to execute the query." },
    ],
    challenge: {
      title: "Your first query",
      prompt: md`Write a query that selects the **name** and **cgpa** columns from the «students» table.`,
      starter: md`-- write your query below
`,
      rules: [
        { re: /\bSELECT\s+name\s*,\s*cgpa\b/i, msg: "SELECT name, cgpa" },
        { re: /\bFROM\s+students\b/i, msg: "FROM students" },
        { re: /;\s*$/, msg: "End the statement with a semicolon" },
      ],
      solution: md`SELECT name, cgpa
FROM students;`,
    },
  },
  {
    id: "sql2",
    title: "Creating Tables",
    summary: "CREATE TABLE, data types, constraints, ALTER and DROP.",
    lessons: [
      {
        title: "CREATE TABLE and data types",
        minutes: 15,
        body: md`~~~sql
CREATE TABLE students (
    id        INT PRIMARY KEY,
    name      VARCHAR(100) NOT NULL,
    email     VARCHAR(150) UNIQUE,
    dept      CHAR(3),
    cgpa      DECIMAL(3, 1),
    joined_on DATE,
    is_active BOOLEAN DEFAULT TRUE
);
~~~

### Common data types
- **Integers**: «INT», «SMALLINT», «BIGINT»
- **Decimals**: «DECIMAL(p, s)» — exact (use for money), «FLOAT» / «DOUBLE» — approximate
- **Text**: «CHAR(n)» fixed length, «VARCHAR(n)» variable length, «TEXT» long text
- **Date/time**: «DATE», «TIME», «DATETIME» / «TIMESTAMP»
- **Boolean**: «BOOLEAN» (stored as 0/1 in MySQL)`,
      },
      {
        title: "Constraints",
        minutes: 15,
        body: md`Constraints are rules the database enforces on every insert and update.
- «PRIMARY KEY» — unique and not null
- «NOT NULL» — a value is required
- «UNIQUE» — no duplicates
- «DEFAULT» — value used when none is given
- «CHECK» — custom condition
- «FOREIGN KEY» — must match a row in another table

~~~sql
CREATE TABLE marks (
    id         INT PRIMARY KEY AUTO_INCREMENT,   -- SERIAL / IDENTITY in PostgreSQL
    student_id INT NOT NULL,
    subject    VARCHAR(50) NOT NULL,
    score      INT CHECK (score BETWEEN 0 AND 100),
    FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
);
~~~
«ON DELETE CASCADE» removes a student's marks automatically when the student is deleted.`,
      },
      {
        title: "ALTER, DROP and TRUNCATE",
        minutes: 15,
        body: md`### Changing a table's structure
~~~sql
ALTER TABLE students ADD phone VARCHAR(15);
ALTER TABLE students DROP COLUMN phone;
ALTER TABLE students RENAME COLUMN dept TO department;
ALTER TABLE students MODIFY name VARCHAR(150);         -- MySQL
-- ALTER TABLE students ALTER COLUMN name TYPE VARCHAR(150);  -- PostgreSQL
~~~

### Removing data or tables
~~~sql
TRUNCATE TABLE marks;   -- delete ALL rows, keep the table (fast)
DROP TABLE marks;       -- delete the table entirely
DROP TABLE IF EXISTS temp_data;
~~~

> «DROP» and «TRUNCATE» can't be filtered with WHERE and are hard to undo. Double-check before running them on real data.`,
      },
    ],
    quiz: [
      { q: "Which data type is best for storing money values exactly?", options: ["FLOAT", "DECIMAL", "VARCHAR", "DOUBLE"], answer: 1, explain: "DECIMAL stores exact values." },
      { q: "Which constraint prevents duplicate values in a column?", options: ["NOT NULL", "UNIQUE", "DEFAULT", "CHECK"], answer: 1, explain: "UNIQUE rejects duplicates." },
      { q: "What does TRUNCATE TABLE do?", options: ["Deletes the table", "Removes all rows but keeps the table", "Removes one column", "Renames the table"], answer: 1, explain: "TRUNCATE empties the table." },
      { q: "Which statement adds a column to an existing table?", options: ["UPDATE TABLE", "ALTER TABLE ... ADD", "INSERT COLUMN", "CREATE COLUMN"], answer: 1, explain: "ALTER TABLE changes structure." },
      { q: "What does «CHECK (score BETWEEN 0 AND 100)» do?", options: ["Sorts scores", "Rejects scores outside 0–100", "Sets default to 0", "Counts scores"], answer: 1, explain: "CHECK enforces a condition." },
    ],
    challenge: {
      title: "Create a courses table",
      prompt: md`Create a table «courses» with:
- «id» INT as the **primary key**
- «title» VARCHAR(100) **not null**
- «fee» DECIMAL(8,2) with a **CHECK** that it's ≥ 0
- «duration_hours» INT with a **DEFAULT** of 12`,
      starter: md`-- write CREATE TABLE here
`,
      rules: [
        { re: /CREATE\s+TABLE\s+courses\s*\(/i, msg: "CREATE TABLE courses (...)" },
        { re: /\bid\s+INT(EGER)?\s+PRIMARY\s+KEY/i, msg: "id INT PRIMARY KEY" },
        { re: /\btitle\s+VARCHAR\s*\(\s*100\s*\)\s+NOT\s+NULL/i, msg: "title VARCHAR(100) NOT NULL" },
        { re: /\bfee\s+DECIMAL\s*\(\s*8\s*,\s*2\s*\)/i, msg: "fee DECIMAL(8,2)" },
        { re: /CHECK\s*\(\s*fee\s*>=\s*0\s*\)/i, msg: "CHECK (fee >= 0)" },
        { re: /\bduration_hours\s+INT(EGER)?\s+DEFAULT\s+12/i, msg: "duration_hours INT DEFAULT 12" },
      ],
      solution: md`CREATE TABLE courses (
    id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    fee DECIMAL(8,2) CHECK (fee >= 0),
    duration_hours INT DEFAULT 12
);`,
    },
  },
  {
    id: "sql3",
    title: "Inserting & Modifying Data",
    summary: "INSERT, UPDATE and DELETE safely.",
    lessons: [
      {
        title: "INSERT",
        minutes: 15,
        body: md`~~~sql
INSERT INTO students (id, name, dept, cgpa)
VALUES (1, 'Asha', 'CSE', 8.9);

-- several rows at once
INSERT INTO students (id, name, dept, cgpa) VALUES
    (2, 'Ravi',  'ECE', 7.6),
    (3, 'Divya', 'CSE', 9.2),
    (4, 'Karthik', 'MECH', 6.8);
~~~
- Always list the columns — your query keeps working if columns are added later.
- Strings and dates use **single quotes**: «'Asha'», «'2026-11-10'».
- Columns you skip get their «DEFAULT» or «NULL».

### Copying rows from a query
~~~sql
INSERT INTO toppers (id, name)
SELECT id, name FROM students WHERE cgpa >= 9;
~~~`,
      },
      {
        title: "UPDATE",
        minutes: 15,
        body: md`~~~sql
UPDATE students
SET cgpa = 9.0
WHERE id = 1;

UPDATE students
SET dept = 'IT', cgpa = cgpa + 0.2
WHERE dept = 'CSE' AND cgpa < 8;
~~~

> **Never forget the WHERE clause.** «UPDATE students SET cgpa = 0;» changes *every* row.

A safe habit: write the «SELECT» first to see which rows match, then turn it into an UPDATE:
~~~sql
SELECT * FROM students WHERE dept = 'CSE' AND cgpa < 8;
~~~
MySQL Workbench has a "safe updates" mode that blocks UPDATE/DELETE without a key in the WHERE clause.`,
      },
      {
        title: "DELETE",
        minutes: 15,
        body: md`~~~sql
DELETE FROM students WHERE id = 4;
DELETE FROM marks WHERE score IS NULL;
~~~

### DELETE vs TRUNCATE vs DROP
- «DELETE» — removes selected rows (with WHERE); can be rolled back in a transaction; fires triggers
- «TRUNCATE» — removes all rows quickly; resets auto-increment
- «DROP» — removes the table itself

### Soft deletes
Many real applications don't delete rows. They mark them instead, so data can be restored and audited:
~~~sql
UPDATE students SET is_active = FALSE WHERE id = 4;
~~~`,
      },
    ],
    quiz: [
      { q: "What happens with «UPDATE students SET cgpa = 0;» (no WHERE)?", options: ["Error", "Only the first row changes", "Every row's cgpa becomes 0", "Nothing"], answer: 2, explain: "Without WHERE, all rows are updated." },
      { q: "Which quotes are used for string values in standard SQL?", options: ["Double quotes", "Single quotes", "Backticks", "None"], answer: 1, explain: "String literals use single quotes." },
      { q: "Which removes specific rows?", options: ["DROP", "TRUNCATE", "DELETE ... WHERE", "ALTER"], answer: 2, explain: "DELETE with WHERE removes matching rows." },
      { q: "What is a soft delete?", options: ["DELETE inside a transaction", "Marking a row inactive instead of removing it", "TRUNCATE", "Deleting a column"], answer: 1, explain: "The row stays but is flagged." },
      { q: "What value does a skipped column get on INSERT?", options: ["0", "Its DEFAULT or NULL", "An error always", "An empty string"], answer: 1, explain: "Unspecified columns get their default." },
    ],
    challenge: {
      title: "Insert and update",
      prompt: md`1. **Insert** a student into «students (id, name, dept, cgpa)» with values «5, 'Meena', 'IT', 8.4».
2. **Update** that student's cgpa to «8.7» using a WHERE on «id = 5».`,
      starter: md`-- 1. INSERT

-- 2. UPDATE
`,
      rules: [
        { re: /INSERT\s+INTO\s+students\s*\(\s*id\s*,\s*name\s*,\s*dept\s*,\s*cgpa\s*\)/i, msg: "INSERT INTO students (id, name, dept, cgpa)" },
        { re: /VALUES\s*\(\s*5\s*,\s*'Meena'\s*,\s*'IT'\s*,\s*8\.4\s*\)/i, msg: "VALUES (5, 'Meena', 'IT', 8.4)" },
        { re: /UPDATE\s+students\s+SET\s+cgpa\s*=\s*8\.7/i, msg: "UPDATE students SET cgpa = 8.7" },
        { re: /UPDATE[\s\S]*WHERE\s+id\s*=\s*5/i, msg: "Limit the update with WHERE id = 5" },
      ],
      solution: md`INSERT INTO students (id, name, dept, cgpa)
VALUES (5, 'Meena', 'IT', 8.4);

UPDATE students
SET cgpa = 8.7
WHERE id = 5;`,
    },
  },
  {
    id: "sql4",
    title: "Querying with SELECT",
    summary: "Filter, sort and limit results.",
    lessons: [
      {
        title: "SELECT and WHERE",
        minutes: 15,
        body: md`~~~sql
SELECT * FROM students;                    -- all columns
SELECT name, cgpa FROM students;           -- chosen columns
SELECT name AS student_name, cgpa * 10 AS percentage
FROM students;                             -- aliases and expressions

SELECT name FROM students WHERE dept = 'CSE';
SELECT name FROM students WHERE cgpa >= 8.5 AND dept <> 'MECH';
~~~
Comparison operators: «=», «<>» (or «!=»), «>», «<», «>=», «<=».

> Avoid «SELECT *» in application code — fetch only the columns you need.`,
      },
      {
        title: "IN, BETWEEN, LIKE and NULL",
        minutes: 15,
        body: md`~~~sql
SELECT * FROM students WHERE dept IN ('CSE', 'IT');
SELECT * FROM students WHERE cgpa BETWEEN 7 AND 8.5;     -- inclusive
SELECT * FROM students WHERE name LIKE 'A%';             -- starts with A
SELECT * FROM students WHERE name LIKE '%a';             -- ends with a
SELECT * FROM students WHERE name LIKE '_a%';            -- 2nd letter is a
~~~
«%» matches any number of characters; «_» matches exactly one.

### NULL means "unknown"
~~~sql
SELECT * FROM students WHERE email IS NULL;
SELECT * FROM students WHERE email IS NOT NULL;
~~~
> «email = NULL» never matches anything — always use «IS NULL».`,
      },
      {
        title: "ORDER BY, LIMIT and DISTINCT",
        minutes: 15,
        body: md`~~~sql
SELECT name, cgpa FROM students
ORDER BY cgpa DESC, name ASC;      -- highest first, ties by name

SELECT name, cgpa FROM students
ORDER BY cgpa DESC
LIMIT 3;                           -- top 3 (MySQL, PostgreSQL, SQLite)
-- SQL Server: SELECT TOP 3 ...    Oracle/standard: FETCH FIRST 3 ROWS ONLY

SELECT name FROM students
ORDER BY id
LIMIT 10 OFFSET 20;                -- page 3 of 10 rows

SELECT DISTINCT dept FROM students;  -- unique values only
~~~

### Logical order of a query
«FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT»
That's why you can't use a SELECT alias inside WHERE in most databases.`,
      },
    ],
    quiz: [
      { q: "Which finds names starting with 'S'?", options: ["name = 'S%'", "name LIKE 'S%'", "name LIKE '%S'", "name IN 'S'"], answer: 1, explain: "% after S matches anything that follows." },
      { q: "How do you find rows where phone has no value?", options: ["phone = NULL", "phone IS NULL", "phone == ''", "phone = 0"], answer: 1, explain: "NULL must be tested with IS NULL." },
      { q: "Is BETWEEN 10 AND 20 inclusive?", options: ["Yes, both ends", "No", "Only the lower end", "Only the upper end"], answer: 0, explain: "BETWEEN includes both boundaries." },
      { q: "Which keyword removes duplicate rows from results?", options: ["UNIQUE", "DISTINCT", "SINGLE", "GROUP"], answer: 1, explain: "SELECT DISTINCT." },
      { q: "Which clause is logically processed first?", options: ["SELECT", "WHERE", "FROM", "ORDER BY"], answer: 2, explain: "FROM identifies the source rows first." },
    ],
    challenge: {
      title: "Top CSE students",
      prompt: md`Select «name» and «cgpa» of students in the **CSE** or **IT** department (use «IN») with cgpa **at least 8**, sorted by cgpa **highest first**, showing only the **top 5**.`,
      starter: md`-- write your query
`,
      rules: [
        { re: /SELECT\s+name\s*,\s*cgpa\s+FROM\s+students/i, msg: "SELECT name, cgpa FROM students" },
        { re: /dept\s+IN\s*\(\s*'CSE'\s*,\s*'IT'\s*\)|dept\s+IN\s*\(\s*'IT'\s*,\s*'CSE'\s*\)/i, msg: "Filter with dept IN ('CSE', 'IT')" },
        { re: /cgpa\s*>=\s*8\b/i, msg: "Require cgpa >= 8" },
        { re: /\bAND\b/i, msg: "Combine conditions with AND" },
        { re: /ORDER\s+BY\s+cgpa\s+DESC/i, msg: "ORDER BY cgpa DESC" },
        { re: /LIMIT\s+5|FETCH\s+FIRST\s+5|TOP\s+5/i, msg: "Limit to 5 rows" },
      ],
      solution: md`SELECT name, cgpa
FROM students
WHERE dept IN ('CSE', 'IT') AND cgpa >= 8
ORDER BY cgpa DESC
LIMIT 5;`,
    },
  },
  {
    id: "sql5",
    title: "Functions & CASE",
    summary: "Aggregate, string, numeric and date functions plus conditional logic.",
    lessons: [
      {
        title: "Aggregate functions",
        minutes: 15,
        body: md`Aggregates summarise many rows into one value.
~~~sql
SELECT COUNT(*)            FROM students;           -- number of rows
SELECT COUNT(email)        FROM students;           -- non-NULL emails
SELECT COUNT(DISTINCT dept) FROM students;          -- unique departments
SELECT AVG(cgpa), MIN(cgpa), MAX(cgpa) FROM students;
SELECT SUM(fee) FROM payments WHERE status = 'PAID';
~~~
- Aggregates **ignore NULLs** (except «COUNT(*)»).
- Use «ROUND(AVG(cgpa), 2)» to tidy decimals.`,
      },
      {
        title: "String, number and date functions",
        minutes: 15,
        body: md`### Strings
~~~sql
SELECT UPPER(name), LOWER(email), LENGTH(name) FROM students;
SELECT CONCAT(name, ' (', dept, ')') AS label FROM students;   -- || in PostgreSQL/SQLite
SELECT SUBSTRING(name, 1, 3) FROM students;
SELECT TRIM('  hi  '), REPLACE(phone, '-', '') FROM students;
~~~

### Numbers
«ROUND(x, 2)», «CEIL(x)», «FLOOR(x)», «ABS(x)», «MOD(a, b)».

### Dates (MySQL syntax)
~~~sql
SELECT CURRENT_DATE, NOW();
SELECT YEAR(joined_on), MONTH(joined_on) FROM students;
SELECT DATEDIFF(CURRENT_DATE, joined_on) AS days_since_joining FROM students;
SELECT * FROM orders WHERE order_date >= CURRENT_DATE - INTERVAL 7 DAY;
~~~
Date functions differ between databases — PostgreSQL uses «EXTRACT(YEAR FROM joined_on)» and «AGE()».

### Handling NULL
«COALESCE(phone, 'Not provided')» returns the first non-NULL value.`,
      },
      {
        title: "CASE expressions",
        minutes: 15,
        body: md`«CASE» adds if/else logic inside a query.
~~~sql
SELECT name, cgpa,
       CASE
           WHEN cgpa >= 9 THEN 'Distinction'
           WHEN cgpa >= 7.5 THEN 'First class'
           WHEN cgpa >= 6 THEN 'Second class'
           ELSE 'Pass'
       END AS category
FROM students;
~~~

### Conditional counting
~~~sql
SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN cgpa >= 8 THEN 1 ELSE 0 END) AS above_8,
    SUM(CASE WHEN dept = 'CSE' THEN 1 ELSE 0 END) AS cse_count
FROM students;
~~~
This "pivot" trick turns rows into summary columns — very common in reports and dashboards.`,
      },
    ],
    quiz: [
      { q: "What does COUNT(email) count?", options: ["All rows", "Rows where email is not NULL", "Distinct emails only", "NULL emails"], answer: 1, explain: "COUNT(column) skips NULLs." },
      { q: "Which function returns the first non-NULL argument?", options: ["NVL2", "COALESCE", "IFNULL only in Oracle", "FIRST"], answer: 1, explain: "COALESCE is standard SQL." },
      { q: "What does «ROUND(7.456, 1)» return?", options: ["7.4", "7.5", "7", "7.46"], answer: 1, explain: "Rounded to one decimal place." },
      { q: "What ends a CASE expression?", options: ["STOP", "END", "ENDCASE", "DONE"], answer: 1, explain: "CASE ... END." },
      { q: "Do aggregate functions like AVG include NULL values?", options: ["Yes, as 0", "No, they ignore NULLs", "Only SUM does", "They return NULL"], answer: 1, explain: "NULLs are skipped." },
    ],
    challenge: {
      title: "Categorise students",
      prompt: md`Select each student's «name», «cgpa» and a **CASE** column named «category»: «'Distinction'» if cgpa ≥ 9, «'First class'» if ≥ 7.5, otherwise «'Pass'».`,
      starter: md`-- write your query
`,
      rules: [
        { re: /SELECT\s+name\s*,\s*cgpa\s*,/i, msg: "SELECT name, cgpa, ..." },
        { re: /\bCASE\b/i, msg: "Use a CASE expression" },
        { re: /WHEN\s+cgpa\s*>=\s*9\s+THEN\s+'Distinction'/i, msg: "WHEN cgpa >= 9 THEN 'Distinction'" },
        { re: /WHEN\s+cgpa\s*>=\s*7\.5\s+THEN\s+'First class'/i, msg: "WHEN cgpa >= 7.5 THEN 'First class'" },
        { re: /ELSE\s+'Pass'/i, msg: "ELSE 'Pass'" },
        { re: /END\s+(AS\s+)?category/i, msg: "Close with END AS category" },
        { re: /FROM\s+students/i, msg: "FROM students" },
      ],
      solution: md`SELECT name, cgpa,
       CASE
           WHEN cgpa >= 9 THEN 'Distinction'
           WHEN cgpa >= 7.5 THEN 'First class'
           ELSE 'Pass'
       END AS category
FROM students;`,
    },
  },
  {
    id: "sql6",
    title: "Grouping Data",
    summary: "GROUP BY, HAVING and building summary reports.",
    lessons: [
      {
        title: "GROUP BY",
        minutes: 15,
        body: md`«GROUP BY» collapses rows with the same value into groups, so aggregates are calculated per group.
~~~sql
SELECT dept, COUNT(*) AS students, ROUND(AVG(cgpa), 2) AS avg_cgpa
FROM students
GROUP BY dept;
~~~
~~~
+------+----------+----------+
| dept | students | avg_cgpa |
+------+----------+----------+
| CSE  |       42 |     8.31 |
| ECE  |       38 |     7.92 |
+------+----------+----------+
~~~

### The golden rule
Every column in SELECT must either be **in the GROUP BY** or **inside an aggregate**. «SELECT dept, name, COUNT(*) ... GROUP BY dept» is an error in standard SQL — which name would it show?`,
      },
      {
        title: "HAVING",
        minutes: 15,
        body: md`«WHERE» filters **rows before** grouping. «HAVING» filters **groups after** aggregation.
~~~sql
SELECT dept, AVG(cgpa) AS avg_cgpa
FROM students
WHERE is_active = TRUE          -- row filter
GROUP BY dept
HAVING AVG(cgpa) > 8            -- group filter
ORDER BY avg_cgpa DESC;
~~~

### Finding duplicates
~~~sql
SELECT email, COUNT(*) AS copies
FROM students
GROUP BY email
HAVING COUNT(*) > 1;
~~~
This is one of the most useful queries for cleaning real-world data.`,
      },
      {
        title: "Multi-column grouping and rollups",
        minutes: 15,
        body: md`### Grouping by more than one column
~~~sql
SELECT dept, YEAR(joined_on) AS batch, COUNT(*) AS students
FROM students
GROUP BY dept, YEAR(joined_on)
ORDER BY dept, batch;
~~~

### Subtotals with ROLLUP
~~~sql
SELECT dept, COUNT(*)
FROM students
GROUP BY dept WITH ROLLUP;          -- MySQL
-- GROUP BY ROLLUP(dept);           -- PostgreSQL / SQL Server
~~~
The extra row with NULL dept is the grand total.

### Typical business questions
- Sales per month → «GROUP BY YEAR(date), MONTH(date)»
- Orders per customer with more than 5 orders → «GROUP BY customer_id HAVING COUNT(*) > 5»
- Revenue per product category → «GROUP BY category» with «SUM(price * qty)»`,
      },
    ],
    quiz: [
      { q: "Which clause filters groups after aggregation?", options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"], answer: 1, explain: "HAVING applies to groups." },
      { q: "In «SELECT dept, COUNT(*) FROM students GROUP BY dept», what does COUNT(*) give?", options: ["Total students", "Students per department", "Number of departments", "Distinct names"], answer: 1, explain: "Aggregates are computed per group." },
      { q: "Which query finds duplicate emails?", options: ["SELECT DISTINCT email", "GROUP BY email HAVING COUNT(*) > 1", "WHERE email = email", "ORDER BY email"], answer: 1, explain: "Groups with more than one row are duplicates." },
      { q: "Can you use WHERE AVG(cgpa) > 8?", options: ["Yes", "No — use HAVING for aggregates", "Only in MySQL", "Only with DISTINCT"], answer: 1, explain: "WHERE runs before aggregation." },
      { q: "What does WITH ROLLUP add?", options: ["Sorting", "Subtotal and grand-total rows", "Indexes", "Duplicate removal"], answer: 1, explain: "ROLLUP adds summary rows." },
    ],
    challenge: {
      title: "Department report",
      prompt: md`For each «dept», show the **number of students** (as «total») and the **average cgpa** (as «avg_cgpa»), only for departments with **more than 10** students, sorted by «avg_cgpa» descending.`,
      starter: md`-- write your query
`,
      rules: [
        { re: /SELECT\s+dept\s*,/i, msg: "SELECT dept, ..." },
        { re: /COUNT\s*\(\s*\*\s*\)\s+(AS\s+)?total/i, msg: "COUNT(*) AS total" },
        { re: /AVG\s*\(\s*cgpa\s*\)\s*\)?\s*(,\s*\d+\s*\))?\s*(AS\s+)?avg_cgpa/i, msg: "AVG(cgpa) AS avg_cgpa" },
        { re: /GROUP\s+BY\s+dept/i, msg: "GROUP BY dept" },
        { re: /HAVING\s+COUNT\s*\(\s*\*\s*\)\s*>\s*10/i, msg: "HAVING COUNT(*) > 10" },
        { re: /ORDER\s+BY\s+avg_cgpa\s+DESC/i, msg: "ORDER BY avg_cgpa DESC" },
      ],
      solution: md`SELECT dept,
       COUNT(*) AS total,
       AVG(cgpa) AS avg_cgpa
FROM students
GROUP BY dept
HAVING COUNT(*) > 10
ORDER BY avg_cgpa DESC;`,
    },
  },
  {
    id: "sql7",
    title: "Joins",
    summary: "Combine tables with INNER, LEFT, RIGHT, FULL, self and cross joins.",
    lessons: [
      {
        title: "INNER JOIN",
        minutes: 15,
        body: md`Joins combine rows from two tables using a related column.
~~~sql
-- students(id, name, dept)     marks(student_id, subject, score)
SELECT s.name, m.subject, m.score
FROM students AS s
INNER JOIN marks AS m ON m.student_id = s.id;
~~~
An **INNER JOIN** returns only rows that have a match in **both** tables. Students with no marks don't appear.

- Table aliases («s», «m») keep queries short.
- Prefix columns with the alias to avoid ambiguity.
- «JOIN» on its own means «INNER JOIN».`,
      },
      {
        title: "LEFT, RIGHT and FULL OUTER JOIN",
        minutes: 15,
        body: md`### LEFT JOIN — keep everything from the left table
~~~sql
SELECT s.name, m.score
FROM students s
LEFT JOIN marks m ON m.student_id = s.id;
~~~
Students without marks still appear, with «NULL» for «score».

### Find rows with no match
~~~sql
SELECT s.name
FROM students s
LEFT JOIN marks m ON m.student_id = s.id
WHERE m.student_id IS NULL;      -- students who have no marks yet
~~~

### RIGHT and FULL
- «RIGHT JOIN» — keep everything from the right table (just swap the tables and use LEFT)
- «FULL OUTER JOIN» — keep unmatched rows from both sides (PostgreSQL / SQL Server; MySQL needs a «UNION» of a LEFT and a RIGHT join)`,
      },
      {
        title: "Multiple, self and cross joins",
        minutes: 15,
        body: md`### Joining three tables
~~~sql
SELECT s.name, c.title, e.enrolled_on
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN courses  c ON c.id = e.course_id
WHERE c.title = 'Java Programming';
~~~
Many-to-many relationships (students ↔ courses) always use a **junction table** like «enrollments».

### Self join — a table joined to itself
~~~sql
-- employees(id, name, manager_id)
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id;
~~~

### CROSS JOIN — every combination
~~~sql
SELECT size, colour FROM sizes CROSS JOIN colours;
~~~
3 sizes × 4 colours = 12 rows. Rarely needed, but useful for generating combinations.`,
      },
    ],
    quiz: [
      { q: "Which join returns only matching rows from both tables?", options: ["LEFT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN"], answer: 1, explain: "INNER JOIN keeps matches only." },
      { q: "In a LEFT JOIN, unmatched right-table columns appear as…", options: ["0", "Empty strings", "NULL", "The row is removed"], answer: 2, explain: "Missing matches are filled with NULL." },
      { q: "How do you find students who have no marks?", options: ["INNER JOIN marks", "LEFT JOIN marks ... WHERE marks.student_id IS NULL", "CROSS JOIN marks", "RIGHT JOIN students"], answer: 1, explain: "Unmatched rows have NULLs on the right side." },
      { q: "What does a self join do?", options: ["Joins a table to itself", "Joins all tables", "Deletes duplicates", "Copies a table"], answer: 0, explain: "Useful for hierarchies like employee–manager." },
      { q: "A many-to-many relationship is implemented with…", options: ["A single foreign key", "A junction (bridge) table", "A view", "An index"], answer: 1, explain: "The junction table holds pairs of foreign keys." },
    ],
    challenge: {
      title: "Student marks report",
      prompt: md`Tables: «students(id, name)» and «marks(student_id, subject, score)». Write a query showing each student's «name», «subject» and «score», including students who **have no marks** (use a **LEFT JOIN** with aliases «s» and «m»). Sort by name.`,
      starter: md`-- write your query
`,
      rules: [
        { re: /SELECT\s+s\.name\s*,\s*m\.subject\s*,\s*m\.score/i, msg: "SELECT s.name, m.subject, m.score" },
        { re: /FROM\s+students\s+(AS\s+)?s\b/i, msg: "FROM students s" },
        { re: /LEFT\s+(OUTER\s+)?JOIN\s+marks\s+(AS\s+)?m\b/i, msg: "LEFT JOIN marks m" },
        { re: /ON\s+(m\.student_id\s*=\s*s\.id|s\.id\s*=\s*m\.student_id)/i, msg: "ON m.student_id = s.id" },
        { re: /ORDER\s+BY\s+s?\.?name/i, msg: "ORDER BY s.name" },
      ],
      solution: md`SELECT s.name, m.subject, m.score
FROM students s
LEFT JOIN marks m ON m.student_id = s.id
ORDER BY s.name;`,
    },
  },
  {
    id: "sql8",
    title: "Subqueries & CTEs",
    summary: "Queries inside queries, EXISTS and WITH clauses.",
    lessons: [
      {
        title: "Subqueries",
        minutes: 15,
        body: md`A **subquery** is a query nested inside another.
~~~sql
-- students above the overall average
SELECT name, cgpa
FROM students
WHERE cgpa > (SELECT AVG(cgpa) FROM students);

-- students enrolled in the Java course
SELECT name FROM students
WHERE id IN (SELECT student_id FROM enrollments WHERE course_id = 1);
~~~

### Subquery in FROM (derived table)
~~~sql
SELECT dept, avg_cgpa
FROM (
    SELECT dept, AVG(cgpa) AS avg_cgpa
    FROM students
    GROUP BY dept
) AS dept_stats
WHERE avg_cgpa > 8;
~~~`,
      },
      {
        title: "Correlated subqueries and EXISTS",
        minutes: 15,
        body: md`A **correlated subquery** refers to the outer query and runs once per outer row.
~~~sql
-- students scoring above their own department's average
SELECT s.name, s.dept, s.cgpa
FROM students s
WHERE s.cgpa > (
    SELECT AVG(s2.cgpa) FROM students s2 WHERE s2.dept = s.dept
);
~~~

### EXISTS / NOT EXISTS
~~~sql
-- students who have at least one mark above 90
SELECT name FROM students s
WHERE EXISTS (
    SELECT 1 FROM marks m WHERE m.student_id = s.id AND m.score > 90
);
~~~
«EXISTS» stops at the first match, so it's often faster than «IN» for large tables. «NOT EXISTS» is the safe way to find missing rows — «NOT IN» behaves unexpectedly when the subquery returns NULLs.`,
      },
      {
        title: "Common Table Expressions (WITH)",
        minutes: 15,
        body: md`A **CTE** names a subquery so the main query reads top to bottom.
~~~sql
WITH dept_avg AS (
    SELECT dept, AVG(cgpa) AS avg_cgpa
    FROM students
    GROUP BY dept
),
top_depts AS (
    SELECT dept FROM dept_avg WHERE avg_cgpa > 8
)
SELECT s.name, s.dept
FROM students s
JOIN top_depts t ON t.dept = s.dept;
~~~

### Recursive CTEs
Walk hierarchies such as org charts or category trees:
~~~sql
WITH RECURSIVE chain AS (
    SELECT id, name, manager_id FROM employees WHERE id = 7
    UNION ALL
    SELECT e.id, e.name, e.manager_id
    FROM employees e JOIN chain c ON e.id = c.manager_id
)
SELECT name FROM chain;    -- employee 7 and every manager above them
~~~`,
      },
    ],
    quiz: [
      { q: "What is a correlated subquery?", options: ["A subquery in FROM", "A subquery that refers to the outer query's columns", "A subquery with GROUP BY", "A join"], answer: 1, explain: "It's evaluated per outer row." },
      { q: "Which keyword starts a CTE?", options: ["CTE", "WITH", "DEFINE", "AS"], answer: 1, explain: "WITH name AS (...)." },
      { q: "What does EXISTS return?", options: ["The matching rows", "True if the subquery returns at least one row", "A count", "NULL"], answer: 1, explain: "EXISTS tests for presence." },
      { q: "Why can NOT IN be risky?", options: ["It's slow only", "If the subquery returns a NULL, no rows match", "It's not standard SQL", "It can't be used with numbers"], answer: 1, explain: "Comparisons with NULL are unknown." },
      { q: "A subquery in the FROM clause must usually have…", options: ["An index", "An alias", "A LIMIT", "A HAVING"], answer: 1, explain: "Derived tables need a name." },
    ],
    challenge: {
      title: "Above-average students",
      prompt: md`Using a **CTE** named «avg_cgpa» that calculates the overall average cgpa (as a column named «value»), select the «name» and «cgpa» of students whose cgpa is **greater than** that average.`,
      starter: md`-- write your query
`,
      rules: [
        { re: /WITH\s+avg_cgpa\s+AS\s*\(/i, msg: "Start with WITH avg_cgpa AS (" },
        { re: /SELECT\s+AVG\s*\(\s*cgpa\s*\)\s+(AS\s+)?value\s+FROM\s+students/i, msg: "Inside: SELECT AVG(cgpa) AS value FROM students" },
        { re: /\)\s*SELECT\s+(s\.)?name\s*,\s*(s\.)?cgpa/i, msg: "Then SELECT name, cgpa" },
        { re: /cgpa\s*>\s*\(\s*SELECT\s+value\s+FROM\s+avg_cgpa\s*\)|cgpa\s*>\s*a\.value|cgpa\s*>\s*avg_cgpa\.value/i, msg: "Filter with cgpa > (SELECT value FROM avg_cgpa)" },
      ],
      solution: md`WITH avg_cgpa AS (
    SELECT AVG(cgpa) AS value FROM students
)
SELECT name, cgpa
FROM students
WHERE cgpa > (SELECT value FROM avg_cgpa);`,
    },
  },
  {
    id: "sql9",
    title: "Set Operations & Views",
    summary: "UNION, INTERSECT, EXCEPT and reusable views.",
    lessons: [
      {
        title: "UNION and UNION ALL",
        minutes: 15,
        body: md`Set operations stack the results of two queries vertically.
~~~sql
SELECT email FROM students
UNION
SELECT email FROM alumni;        -- unique emails from both

SELECT city FROM students
UNION ALL
SELECT city FROM staff;          -- keeps duplicates (faster)
~~~
Rules:
- Both queries must have the **same number of columns**.
- Corresponding columns must have **compatible types**.
- Column names come from the first query.
- Put «ORDER BY» once, at the very end.`,
      },
      {
        title: "INTERSECT and EXCEPT",
        minutes: 15,
        body: md`~~~sql
-- in both lists
SELECT student_id FROM java_enrollments
INTERSECT
SELECT student_id FROM python_enrollments;

-- in the first list but not the second
SELECT student_id FROM java_enrollments
EXCEPT                              -- MINUS in Oracle
SELECT student_id FROM python_enrollments;
~~~
PostgreSQL, SQL Server, SQLite and MySQL 8.0.31+ support both. On older MySQL, use joins:
~~~sql
SELECT j.student_id
FROM java_enrollments j
LEFT JOIN python_enrollments p ON p.student_id = j.student_id
WHERE p.student_id IS NULL;        -- same as EXCEPT
~~~`,
      },
      {
        title: "Views",
        minutes: 15,
        body: md`A **view** is a saved query you can use like a table.
~~~sql
CREATE VIEW cse_toppers AS
SELECT id, name, cgpa
FROM students
WHERE dept = 'CSE' AND cgpa >= 9;

SELECT * FROM cse_toppers ORDER BY cgpa DESC;
~~~

### Why use views?
- **Simplicity** — hide complex joins behind a simple name.
- **Security** — give users access to the view but not the underlying tables (e.g. hide phone numbers).
- **Consistency** — everyone uses the same business logic.

~~~sql
CREATE OR REPLACE VIEW ...   -- update the definition
DROP VIEW cse_toppers;
~~~
A normal view stores no data; it runs its query each time. **Materialized views** (PostgreSQL, Oracle) store the result and are refreshed periodically — great for heavy reports.`,
      },
    ],
    quiz: [
      { q: "What is the difference between UNION and UNION ALL?", options: ["None", "UNION removes duplicates; UNION ALL keeps them", "UNION ALL removes duplicates", "UNION works only with numbers"], answer: 1, explain: "UNION ALL is faster because it skips de-duplication." },
      { q: "Which returns rows present in both queries?", options: ["UNION", "EXCEPT", "INTERSECT", "JOIN ALL"], answer: 2, explain: "INTERSECT keeps common rows." },
      { q: "What must match between queries combined with UNION?", options: ["Table names", "Number and types of columns", "WHERE clauses", "Row counts"], answer: 1, explain: "Columns must line up." },
      { q: "Does a normal view store its own copy of the data?", options: ["Yes", "No — it runs the saved query each time", "Only for joins", "Only in MySQL"], answer: 1, explain: "Only materialized views store results." },
      { q: "A good security use of a view is…", options: ["Speeding up inserts", "Exposing only some columns of a table", "Deleting rows", "Creating indexes"], answer: 1, explain: "Users can query the view without seeing hidden columns." },
    ],
    challenge: {
      title: "Toppers view",
      prompt: md`Create a view named «toppers» that shows «name», «dept» and «cgpa» of students with cgpa **≥ 9**. Then select everything from the view ordered by cgpa descending.`,
      starter: md`-- create the view, then query it
`,
      rules: [
        { re: /CREATE\s+(OR\s+REPLACE\s+)?VIEW\s+toppers\s+AS/i, msg: "CREATE VIEW toppers AS" },
        { re: /SELECT\s+name\s*,\s*dept\s*,\s*cgpa\s+FROM\s+students/i, msg: "SELECT name, dept, cgpa FROM students" },
        { re: /WHERE\s+cgpa\s*>=\s*9/i, msg: "WHERE cgpa >= 9" },
        { re: /SELECT\s+\*\s+FROM\s+toppers/i, msg: "SELECT * FROM toppers" },
        { re: /FROM\s+toppers[\s\S]*ORDER\s+BY\s+cgpa\s+DESC/i, msg: "ORDER BY cgpa DESC" },
      ],
      solution: md`CREATE VIEW toppers AS
SELECT name, dept, cgpa
FROM students
WHERE cgpa >= 9;

SELECT * FROM toppers ORDER BY cgpa DESC;`,
    },
  },
  {
    id: "sql10",
    title: "Database Design & Normalization",
    summary: "Model data with ER diagrams, relationships and normal forms.",
    lessons: [
      {
        title: "Relationships and ER modelling",
        minutes: 15,
        body: md`Before creating tables, model the **entities** (things), their **attributes** and the **relationships** between them — an **ER diagram**.

### Relationship types
- **One-to-one** — a student has one ID card. Put a UNIQUE foreign key on one side.
- **One-to-many** — a department has many students. Put the foreign key on the "many" side («students.dept_id»).
- **Many-to-many** — students take many courses; courses have many students. Use a **junction table**:
~~~sql
CREATE TABLE enrollments (
    student_id INT REFERENCES students(id),
    course_id  INT REFERENCES courses(id),
    enrolled_on DATE,
    PRIMARY KEY (student_id, course_id)     -- composite key
);
~~~`,
      },
      {
        title: "Normalization: 1NF, 2NF, 3NF",
        minutes: 15,
        body: md`**Normalization** organises tables to remove redundancy and update anomalies.

### First Normal Form (1NF)
Each cell holds a **single value**; no repeating groups.
Bad: «phones = '98400..., 98410...'». Good: a separate «student_phones» table.

### Second Normal Form (2NF)
1NF, and every non-key column depends on the **whole** primary key (matters for composite keys).
Bad: «enrollments(student_id, course_id, course_title)» — «course_title» depends only on «course_id». Move it to «courses».

### Third Normal Form (3NF)
2NF, and no non-key column depends on **another non-key column**.
Bad: «students(id, name, dept_id, dept_name)» — «dept_name» depends on «dept_id». Move it to «departments».

> "Every non-key attribute must depend on the key, the whole key, and nothing but the key."`,
      },
      {
        title: "Anomalies, denormalization and good naming",
        minutes: 15,
        body: md`### Why normalize? Avoid anomalies
- **Insert anomaly** — can't add a department until a student joins it.
- **Update anomaly** — renaming a department requires updating hundreds of rows (and missing some).
- **Delete anomaly** — deleting the last student deletes the department's information too.

### When to denormalize
Reporting systems and data warehouses sometimes **duplicate data on purpose** to avoid expensive joins. Do it deliberately, for measured performance reasons.

### Design checklist
- Every table has a primary key (often a surrogate «id»).
- Use consistent, singular or plural names — and stick to one style.
- Store dates as «DATE», money as «DECIMAL», never as text.
- Add foreign keys so the database protects relationships.
- Add «created_at» / «updated_at» timestamps for auditing.`,
      },
    ],
    quiz: [
      { q: "Where does the foreign key go in a one-to-many relationship?", options: ["The 'one' side", "The 'many' side", "Both sides", "A junction table always"], answer: 1, explain: "Each 'many' row points to its 'one'." },
      { q: "A column storing 'Java, Python, SQL' in one cell violates…", options: ["1NF", "2NF", "3NF", "BCNF only"], answer: 0, explain: "1NF requires atomic values." },
      { q: "«students(id, dept_id, dept_name)» violates which normal form?", options: ["1NF", "2NF", "3NF", "None"], answer: 2, explain: "dept_name depends on dept_id, a non-key column." },
      { q: "How is a many-to-many relationship stored?", options: ["Comma-separated IDs", "A junction table with two foreign keys", "Two primary keys in one table", "A view"], answer: 1, explain: "Junction tables are the standard approach." },
      { q: "What is an update anomaly?", options: ["A failed UPDATE", "The same fact stored in many rows becomes inconsistent when only some are updated", "A slow query", "A NULL value"], answer: 1, explain: "Redundancy causes inconsistent updates." },
    ],
    challenge: {
      title: "Enrollments junction table",
      prompt: md`Create a table «enrollments» linking «students(id)» and «courses(id)»: columns «student_id INT», «course_id INT» and «enrolled_on DATE», with **foreign keys** to both tables and a **composite primary key** on «(student_id, course_id)».`,
      starter: md`-- write CREATE TABLE enrollments
`,
      rules: [
        { re: /CREATE\s+TABLE\s+enrollments\s*\(/i, msg: "CREATE TABLE enrollments (" },
        { re: /student_id\s+INT/i, msg: "student_id INT" },
        { re: /course_id\s+INT/i, msg: "course_id INT" },
        { re: /enrolled_on\s+DATE/i, msg: "enrolled_on DATE" },
        { re: /REFERENCES\s+students\s*\(\s*id\s*\)/i, msg: "Foreign key REFERENCES students(id)" },
        { re: /REFERENCES\s+courses\s*\(\s*id\s*\)/i, msg: "Foreign key REFERENCES courses(id)" },
        { re: /PRIMARY\s+KEY\s*\(\s*student_id\s*,\s*course_id\s*\)/i, msg: "PRIMARY KEY (student_id, course_id)" },
      ],
      solution: md`CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    enrolled_on DATE,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);`,
    },
  },
  {
    id: "sql11",
    title: "Transactions & Indexes",
    summary: "ACID transactions, isolation and making queries fast.",
    lessons: [
      {
        title: "Transactions and ACID",
        minutes: 15,
        body: md`A **transaction** groups statements so they succeed or fail **together**.
~~~sql
START TRANSACTION;          -- BEGIN in PostgreSQL
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;                     -- make it permanent
~~~
If something goes wrong in between, «ROLLBACK;» undoes everything since the transaction began.

### ACID properties
- **Atomicity** — all or nothing
- **Consistency** — constraints are always satisfied
- **Isolation** — concurrent transactions don't see each other's half-finished work
- **Durability** — once committed, data survives crashes

### Savepoints
~~~sql
SAVEPOINT before_bonus;
UPDATE salaries SET amount = amount * 1.1;
ROLLBACK TO before_bonus;
~~~`,
      },
      {
        title: "Concurrency and isolation levels",
        minutes: 15,
        body: md`When many users work at once, these problems can occur:
- **Dirty read** — reading another transaction's uncommitted change
- **Non-repeatable read** — the same row returns different values within one transaction
- **Phantom read** — new rows appear when you re-run a query

### Isolation levels (weakest → strongest)
- «READ UNCOMMITTED» — allows dirty reads
- «READ COMMITTED» — default in PostgreSQL, Oracle and SQL Server
- «REPEATABLE READ» — default in MySQL InnoDB
- «SERIALIZABLE» — transactions behave as if run one after another

~~~sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
~~~
Stronger isolation is safer but reduces concurrency. **Locks** («SELECT ... FOR UPDATE») stop two people booking the same seat.`,
      },
      {
        title: "Indexes and query performance",
        minutes: 15,
        body: md`An **index** is like a book's index: it lets the database find rows without scanning the whole table.
~~~sql
CREATE INDEX idx_students_email ON students(email);
CREATE UNIQUE INDEX idx_students_roll ON students(roll_no);
CREATE INDEX idx_marks_student_subject ON marks(student_id, subject);   -- composite
~~~
Primary keys and unique constraints are indexed automatically.

### Trade-offs
- ✅ Much faster «WHERE», «JOIN» and «ORDER BY» on indexed columns
- ❌ Slower «INSERT»/«UPDATE»/«DELETE» and extra storage

### Reading the plan
~~~sql
EXPLAIN SELECT * FROM students WHERE email = 'asha@x.com';
~~~
Look for a **full table scan** on big tables — that's usually where an index helps.

> Functions on indexed columns can stop index use: «WHERE YEAR(joined_on) = 2026» can't use an index on joined_on, but «WHERE joined_on >= '2026-01-01' AND joined_on < '2027-01-01'» can.`,
      },
    ],
    quiz: [
      { q: "Which command permanently saves a transaction's changes?", options: ["SAVE", "COMMIT", "END", "PERSIST"], answer: 1, explain: "COMMIT makes changes durable." },
      { q: "What does the A in ACID stand for?", options: ["Availability", "Atomicity", "Accuracy", "Authorization"], answer: 1, explain: "All or nothing." },
      { q: "What is a dirty read?", options: ["Reading deleted rows", "Reading another transaction's uncommitted data", "A slow read", "Reading NULLs"], answer: 1, explain: "The data may later be rolled back." },
      { q: "What's a downside of adding many indexes?", options: ["Slower SELECTs", "Slower writes and more storage", "Data loss", "No downside"], answer: 1, explain: "Every write must update the indexes." },
      { q: "Which statement shows how a query will be executed?", options: ["DESCRIBE", "EXPLAIN", "SHOW PLAN TABLE", "TRACE"], answer: 1, explain: "EXPLAIN reveals the query plan." },
    ],
    challenge: {
      title: "Money transfer",
      prompt: md`Write a **transaction** that transfers «1000» from account «id = 1» to account «id = 2» in the «accounts(id, balance)» table: start the transaction, **subtract** from one, **add** to the other, then **commit**. Finally, create an index named «idx_accounts_balance» on «balance».`,
      starter: md`-- write the transaction and the index
`,
      rules: [
        { re: /(START\s+TRANSACTION|BEGIN)\s*;/i, msg: "START TRANSACTION; (or BEGIN;)" },
        { re: /UPDATE\s+accounts\s+SET\s+balance\s*=\s*balance\s*-\s*1000\s+WHERE\s+id\s*=\s*1/i, msg: "UPDATE accounts SET balance = balance - 1000 WHERE id = 1" },
        { re: /UPDATE\s+accounts\s+SET\s+balance\s*=\s*balance\s*\+\s*1000\s+WHERE\s+id\s*=\s*2/i, msg: "UPDATE accounts SET balance = balance + 1000 WHERE id = 2" },
        { re: /COMMIT\s*;/i, msg: "COMMIT;" },
        { re: /CREATE\s+INDEX\s+idx_accounts_balance\s+ON\s+accounts\s*\(\s*balance\s*\)/i, msg: "CREATE INDEX idx_accounts_balance ON accounts(balance)" },
      ],
      solution: md`START TRANSACTION;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;
COMMIT;

CREATE INDEX idx_accounts_balance ON accounts(balance);`,
    },
  },
  {
    id: "sql12",
    title: "Advanced SQL",
    summary: "Window functions, stored procedures, triggers and SQL security.",
    lessons: [
      {
        title: "Window functions",
        minutes: 15,
        body: md`Window functions calculate across related rows **without collapsing them** like GROUP BY does.
~~~sql
SELECT name, dept, cgpa,
       RANK()       OVER (PARTITION BY dept ORDER BY cgpa DESC) AS dept_rank,
       ROUND(AVG(cgpa) OVER (PARTITION BY dept), 2)             AS dept_avg
FROM students;
~~~
- «PARTITION BY» — restart the calculation for each group
- «ORDER BY» inside «OVER» — defines the order for ranking/running totals

### Ranking functions
«ROW_NUMBER()» (1, 2, 3, 4), «RANK()» (1, 2, 2, 4), «DENSE_RANK()» (1, 2, 2, 3).

### Top N per group
~~~sql
WITH ranked AS (
    SELECT name, dept, cgpa,
           ROW_NUMBER() OVER (PARTITION BY dept ORDER BY cgpa DESC) AS rn
    FROM students
)
SELECT * FROM ranked WHERE rn <= 3;
~~~

### Running totals and comparisons
«SUM(amount) OVER (ORDER BY paid_on)», «LAG(amount) OVER (ORDER BY paid_on)».`,
      },
      {
        title: "Stored procedures and triggers",
        minutes: 15,
        body: md`### Stored procedure (MySQL syntax)
Reusable logic stored in the database:
~~~sql
DELIMITER //
CREATE PROCEDURE enroll_student(IN p_student INT, IN p_course INT)
BEGIN
    INSERT INTO enrollments (student_id, course_id, enrolled_on)
    VALUES (p_student, p_course, CURRENT_DATE);
END //
DELIMITER ;

CALL enroll_student(5, 1);
~~~

### Triggers
Run automatically on INSERT, UPDATE or DELETE:
~~~sql
CREATE TRIGGER trg_marks_audit
AFTER UPDATE ON marks
FOR EACH ROW
INSERT INTO marks_audit (mark_id, old_score, new_score, changed_at)
VALUES (OLD.id, OLD.score, NEW.score, NOW());
~~~
Use triggers sparingly — hidden logic can surprise other developers.`,
      },
      {
        title: "Security and SQL injection",
        minutes: 15,
        body: md`### SQL injection
Building queries by gluing user input into strings is dangerous:
~~~
query = "SELECT * FROM users WHERE email = '" + input + "'"
input = ' OR '1'='1
→ SELECT * FROM users WHERE email = '' OR '1'='1'    -- returns every user!
~~~

### The fix: parameterized queries
~~~python
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
~~~
~~~java
PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE email = ?");
ps.setString(1, email);
~~~
The database treats the value strictly as **data**, never as SQL.

### Least privilege
~~~sql
CREATE USER 'report_app'@'%' IDENTIFIED BY 'strong-password';
GRANT SELECT ON college.students TO 'report_app'@'%';
REVOKE DELETE ON college.* FROM 'intern'@'%';
~~~
Give each application only the permissions it needs, and never connect as «root» from an app.`,
      },
    ],
    quiz: [
      { q: "How do window functions differ from GROUP BY?", options: ["They're slower", "They keep individual rows while computing across groups", "They can't use ORDER BY", "They only work with COUNT"], answer: 1, explain: "Rows aren't collapsed." },
      { q: "For ties, which returns 1, 2, 2, 3?", options: ["ROW_NUMBER", "RANK", "DENSE_RANK", "NTILE"], answer: 2, explain: "DENSE_RANK doesn't skip numbers." },
      { q: "What does PARTITION BY dept do in a window function?", options: ["Sorts by dept", "Restarts the calculation for each dept", "Filters depts", "Creates a table"], answer: 1, explain: "Each department is a separate window." },
      { q: "What is the main defence against SQL injection?", options: ["Hiding error messages", "Parameterized queries / prepared statements", "Using uppercase keywords", "Stored procedures only"], answer: 1, explain: "Parameters keep data separate from SQL." },
      { q: "When does an AFTER UPDATE trigger run?", options: ["Before any update", "Automatically after a row is updated", "Only when called with CALL", "On SELECT"], answer: 1, explain: "Triggers fire on the specified event." },
    ],
    challenge: {
      title: "Rank within department",
      prompt: md`Select «name», «dept», «cgpa» and a column «dept_rank» that ranks students **within each department** by cgpa (highest = 1) using **RANK() OVER (PARTITION BY ... ORDER BY ...)**.`,
      starter: md`-- write your query
`,
      rules: [
        { re: /SELECT\s+name\s*,\s*dept\s*,\s*cgpa\s*,/i, msg: "SELECT name, dept, cgpa, ..." },
        { re: /\b(RANK|DENSE_RANK)\s*\(\s*\)\s+OVER\s*\(/i, msg: "Use RANK() OVER (...)" },
        { re: /PARTITION\s+BY\s+dept/i, msg: "PARTITION BY dept" },
        { re: /OVER\s*\([^)]*ORDER\s+BY\s+cgpa\s+DESC/i, msg: "ORDER BY cgpa DESC inside OVER" },
        { re: /\)\s+(AS\s+)?dept_rank/i, msg: "Name the column dept_rank" },
        { re: /FROM\s+students/i, msg: "FROM students" },
      ],
      solution: md`SELECT name, dept, cgpa,
       RANK() OVER (PARTITION BY dept ORDER BY cgpa DESC) AS dept_rank
FROM students;`,
    },
  },
];

const FINAL_EXAM = [
  { q: "Which statement retrieves data?", options: ["GET", "SELECT", "FETCH ALL", "SHOW"], answer: 1, explain: "SELECT queries data." },
  { q: "Which constraint ensures a column always has a value?", options: ["UNIQUE", "NOT NULL", "CHECK", "DEFAULT"], answer: 1, explain: "NOT NULL rejects missing values." },
  { q: "How do you match names ending in 'an'?", options: ["LIKE 'an%'", "LIKE '%an'", "= '%an'", "IN ('an')"], answer: 1, explain: "% before 'an' matches any prefix." },
  { q: "What does «SELECT COUNT(*) FROM students WHERE dept = 'CSE'» return?", options: ["All students", "Number of CSE students", "CSE student names", "Average cgpa"], answer: 1, explain: "COUNT(*) counts matching rows." },
  { q: "Which clause filters aggregated groups?", options: ["WHERE", "HAVING", "GROUP BY", "LIMIT"], answer: 1, explain: "HAVING runs after GROUP BY." },
  { q: "Which join keeps all rows from the left table?", options: ["INNER", "LEFT", "CROSS", "SELF"], answer: 1, explain: "LEFT JOIN preserves the left side." },
  { q: "What does UNION do with duplicate rows?", options: ["Keeps them", "Removes them", "Errors", "Sorts them only"], answer: 1, explain: "Use UNION ALL to keep duplicates." },
  { q: "Which statement changes existing rows?", options: ["ALTER", "UPDATE", "MODIFY ROW", "INSERT"], answer: 1, explain: "UPDATE modifies data; ALTER changes structure." },
  { q: "What is the correct NULL test?", options: ["= NULL", "IS NULL", "== NULL", "EQUALS NULL"], answer: 1, explain: "NULL comparisons need IS NULL." },
  { q: "A table in 3NF should not have…", options: ["A primary key", "Non-key columns depending on other non-key columns", "Foreign keys", "More than 5 columns"], answer: 1, explain: "That's a transitive dependency." },
  { q: "Which command undoes an uncommitted transaction?", options: ["UNDO", "ROLLBACK", "REVERT", "DELETE"], answer: 1, explain: "ROLLBACK discards uncommitted changes." },
  { q: "What is the main purpose of an index?", options: ["Enforce relationships", "Speed up data lookup", "Back up data", "Encrypt data"], answer: 1, explain: "Indexes avoid full table scans." },
  { q: "Which keyword defines a Common Table Expression?", options: ["WITH", "CTE", "TEMP", "DEFINE"], answer: 0, explain: "WITH name AS (...)." },
  { q: "ROW_NUMBER() OVER (PARTITION BY dept ORDER BY cgpa DESC) gives…", options: ["One row per dept", "A ranking that restarts in each department", "The department count", "An error"], answer: 1, explain: "It numbers rows within each partition." },
  { q: "What prevents SQL injection?", options: ["Concatenating strings carefully", "Parameterized (prepared) statements", "Using views", "Long passwords"], answer: 1, explain: "Parameters separate data from code." },
];

export const SQL_COURSE = {
  id: "sql",
  slug: "sql",
  title: "SQL & Databases",
  topics: "Relational Databases, Queries, Joins, Subqueries, Database Design, Transactions and Window Functions",
  hours: 12,
  passPercent: 70,
  storageKey: "journify.course.sql.v1",
  lang: "sql",
  fileName: "query.sql",
  icon: "SQL",
  tagline: "Query, design and optimise relational databases — the skill every developer and analyst needs.",
  modules: MODULES,
  finalExam: FINAL_EXAM,
};
