// Python course. Lesson markdown: paragraphs, "- " lists, "### " headings, "> " tips,
// ~~~ code fences, «inline code» and **bold**.
const md = String.raw;

const MODULES = [
  {
    id: "py1",
    title: "Getting Started with Python",
    summary: "What Python is, how to run it, and your first program.",
    lessons: [
      {
        title: "What is Python?",
        minutes: 15,
        body: md`Python is a **high-level, general-purpose programming language** known for clean, readable code. It was created by Guido van Rossum and released in 1991.

### Where Python is used
- **Data science & AI** — pandas, NumPy, scikit-learn, TensorFlow, PyTorch
- **Web development** — Django, Flask, FastAPI
- **Automation & scripting** — renaming files, scraping websites, sending reports
- **Testing, DevOps and cybersecurity tools**

### Why it's beginner-friendly
- Simple syntax that reads almost like English.
- No semicolons or curly braces — **indentation** defines code blocks.
- Huge standard library ("batteries included") and over 400,000 packages on PyPI.

### Interpreted language
Python code is run line by line by the **Python interpreter**. There's no separate compile step you have to run yourself, which makes experimenting fast.

> Install Python 3 from python.org (tick **"Add Python to PATH"** on Windows). Python 2 is retired — always use Python 3.`,
      },
      {
        title: "Running Python code",
        minutes: 15,
        body: md`### The interactive shell (REPL)
Type «python» (or «python3») in a terminal to get the «>>>» prompt. Each line runs immediately:
~~~python
>>> 2 + 3
5
>>> print("Hi")
Hi
~~~
Type «exit()» to leave.

### Running a script
Save code in a file ending with «.py», e.g. «hello.py»:
~~~python
print("Hello, World!")
~~~
Then run it:
~~~bash
python hello.py
~~~

### Editors
**VS Code** (with the Python extension), **PyCharm** and **Jupyter Notebook** are popular. Jupyter is great for data science because you can run code cell by cell and see charts inline.

> Use «python --version» to check which version is installed.`,
      },
      {
        title: "print(), comments and indentation",
        minutes: 15,
        body: md`### print()
~~~python
print("Hello, Journify!")
print("Python", "is", "fun")          # Python is fun  (separated by spaces)
print("A", "B", sep="-")             # A-B
print("Same line", end=" ")
print("continued")                    # Same line continued
~~~

### Comments
~~~python
# This is a single-line comment

"""
Triple-quoted strings are often used as
multi-line comments or docstrings.
"""
~~~

### Indentation matters
Python uses indentation (4 spaces by convention) to group statements:
~~~python
if 5 > 2:
    print("Five is greater")   # inside the if
print("Done")                   # outside the if
~~~
Wrong indentation causes an «IndentationError».

> Python is **case-sensitive**: «print» works, «Print» raises a «NameError».`,
      },
    ],
    quiz: [
      { q: "How does Python mark a block of code (e.g. inside an if)?", options: ["Curly braces { }", "Indentation", "BEGIN/END keywords", "Semicolons"], answer: 1, explain: "Python uses indentation to define blocks." },
      { q: "Which file extension do Python scripts use?", options: [".pt", ".py", ".pyt", ".python"], answer: 1, explain: "Python source files end with .py." },
      { q: "What does «print(\"A\", \"B\", sep=\"-\")» output?", options: ["A B", "AB", "A-B", "A\\nB"], answer: 2, explain: "sep sets the separator between items." },
      { q: "Which symbol starts a single-line comment in Python?", options: ["//", "#", "--", "/*"], answer: 1, explain: "# starts a comment that runs to the end of the line." },
      { q: "Which version of Python should you use for new projects?", options: ["Python 2", "Python 3", "Either, they're identical", "Python 1"], answer: 1, explain: "Python 2 reached end of life in 2020." },
    ],
    challenge: {
      title: "Hello, Journify!",
      prompt: md`Write a Python program that prints exactly two lines:
~~~
Hello, Journify!
I am learning Python
~~~`,
      starter: md`# write your code below
`,
      rules: [
        { re: /print\s*\(\s*["']Hello, Journify!["']\s*\)/, msg: 'Print "Hello, Journify!" with print()' },
        { re: /print\s*\(\s*["']I am learning Python["']\s*\)/, msg: 'Print "I am learning Python" on the second line' },
      ],
      solution: md`print("Hello, Journify!")
print("I am learning Python")`,
    },
  },
  {
    id: "py2",
    title: "Variables, Data Types & Input",
    summary: "Store values, understand types and read user input.",
    lessons: [
      {
        title: "Variables and dynamic typing",
        minutes: 15,
        body: md`A variable is created the moment you assign a value — no type declaration needed.
~~~python
name = "Kavya"
age = 21
cgpa = 8.6
is_placed = False
~~~
Python is **dynamically typed**: the type belongs to the value, and a variable can later hold a different type.
~~~python
x = 10        # int
x = "ten"     # now a str
~~~

### Multiple assignment
~~~python
a, b, c = 1, 2, 3
x = y = 0
a, b = b, a     # swap in one line!
~~~

### Naming rules
- Letters, digits and underscores; can't start with a digit.
- Use **snake_case**: «total_marks», «student_name».
- Avoid keywords like «class», «for», «if».`,
      },
      {
        title: "Core data types",
        minutes: 15,
        body: md`- «int» — whole numbers of any size: «42», «-7», «10**20»
- «float» — decimals: «3.14», «2.0», «1e-3»
- «str» — text: «"hello"» or «'hello'»
- «bool» — «True» or «False»
- «NoneType» — the special value «None» ("no value")

~~~python
print(type(42))        # <class 'int'>
print(type(3.5))       # <class 'float'>
print(type("hi"))      # <class 'str'>
print(type(None))      # <class 'NoneType'>
~~~

### Numbers
~~~python
print(7 / 2)    # 3.5   true division always gives a float
print(7 // 2)   # 3     floor division
print(7 % 2)    # 1     remainder
print(2 ** 10)  # 1024  power
~~~
> Floats are approximate: «0.1 + 0.2» is «0.30000000000000004». Use «round()» or the «decimal» module for money.`,
      },
      {
        title: "Type conversion and input()",
        minutes: 15,
        body: md`### Converting types
~~~python
int("25")        # 25
float("3.5")     # 3.5
str(100)         # "100"
int(9.99)        # 9  (truncates)
bool(0)          # False
bool("hi")       # True
~~~

### Reading input
«input()» always returns a **string**:
~~~python
name = input("Enter your name: ")
age = int(input("Enter your age: "))
print("Hi", name, "- next year you'll be", age + 1)
~~~
Forgetting «int()» leads to errors like «TypeError: can only concatenate str (not "int") to str».

> «int("abc")» raises a «ValueError». You'll learn to handle that with try/except later.`,
      },
    ],
    quiz: [
      { q: "What is the type of «3.0»?", options: ["int", "float", "str", "double"], answer: 1, explain: "Any number with a decimal point is a float." },
      { q: "What does «7 // 2» evaluate to?", options: ["3.5", "3", "4", "1"], answer: 1, explain: "// is floor division." },
      { q: "What type does input() return?", options: ["int", "str", "Depends on what's typed", "float"], answer: 1, explain: "input() always returns a string." },
      { q: "After «a, b = 1, 2» and «a, b = b, a», what is a?", options: ["1", "2", "None", "Error"], answer: 1, explain: "Tuple unpacking swaps the values." },
      { q: "Which is a valid variable name?", options: ["2nd_name", "student-name", "student_name", "class"], answer: 2, explain: "Names can't start with a digit, contain hyphens or be keywords." },
    ],
    challenge: {
      title: "Age next year",
      prompt: md`Ask the user for their **name** and **age** using «input()». Convert the age to an integer and print a message like «Hi Kavya, next year you will be 22».`,
      starter: md`# read name and age, then print the message
`,
      rules: [
        { re: /\w+\s*=\s*input\s*\(/, msg: "Read the name with input()" },
        { re: /int\s*\(\s*input\s*\(|int\s*\(\s*\w+\s*\)/, msg: "Convert the age to an integer with int()" },
        { re: /\+\s*1/, msg: "Add 1 to the age" },
        { re: /print\s*\(/, msg: "Print the message with print()" },
      ],
      solution: md`name = input("Enter your name: ")
age = int(input("Enter your age: "))
print(f"Hi {name}, next year you will be {age + 1}")`,
    },
  },
  {
    id: "py3",
    title: "Operators & Strings",
    summary: "Arithmetic, comparisons, logic and powerful string handling.",
    lessons: [
      {
        title: "Operators",
        minutes: 15,
        body: md`### Arithmetic and assignment
«+  -  *  /  //  %  **» and the shortcuts «+=  -=  *=  /=».
~~~python
score = 10
score += 5    # 15
score **= 2   # 225
~~~

### Comparison
«==  !=  >  <  >=  <=» return «True» or «False». Python allows chaining:
~~~python
marks = 72
print(60 <= marks < 75)   # True
~~~

### Logical
«and», «or», «not»:
~~~python
eligible = marks >= 60 and attendance >= 75
~~~

### Membership and identity
~~~python
print("a" in "java")       # True
print(3 in [1, 2, 3])      # True
x = None
print(x is None)           # True — use 'is' for None checks
~~~`,
      },
      {
        title: "Strings, indexing and slicing",
        minutes: 15,
        body: md`Strings are **sequences** of characters. Index from 0, or from the end with negatives.
~~~python
s = "Journify"
print(s[0])      # J
print(s[-1])     # y
print(len(s))    # 8
~~~

### Slicing «[start:stop:step]»
~~~python
print(s[0:4])    # Jour   (stop is excluded)
print(s[4:])     # nify
print(s[:3])     # Jou
print(s[::-1])   # yfinruoJ  (reversed)
~~~

### Strings are immutable
«s[0] = "j"» raises a «TypeError». Build a new string instead: «s = "j" + s[1:]».

### Multi-line strings
~~~python
msg = """Line one
Line two"""
~~~`,
      },
      {
        title: "String methods and f-strings",
        minutes: 15,
        body: md`### Useful methods
~~~python
"  hello  ".strip()           # "hello"
"python".upper()              # "PYTHON"
"Hello World".lower()         # "hello world"
"hello world".title()         # "Hello World"
"a,b,c".split(",")            # ['a', 'b', 'c']
"-".join(["2026", "11", "10"])  # "2026-11-10"
"banana".replace("a", "o")    # "bonono"
"banana".count("a")           # 3
"python".startswith("py")     # True
"java".find("v")              # 2   (-1 if not found)
~~~

### f-strings (formatted strings)
~~~python
name, marks = "Arun", 91.456
print(f"{name} scored {marks:.1f}%")   # Arun scored 91.5%
print(f"{7 * 8 = }")                    # 7 * 8 = 56
print(f"{'left':<10}|")                 # left      |
~~~
> f-strings are the modern, fastest way to build strings — prefer them over «+» concatenation.`,
      },
    ],
    quiz: [
      { q: "What is «\"Python\"[1:4]»?", options: ["Pyt", "yth", "ytho", "ython"], answer: 1, explain: "Indexes 1, 2, 3 → y, t, h." },
      { q: "What does «\"abc\"[::-1]» return?", options: ["abc", "cba", "a", "Error"], answer: 1, explain: "A step of -1 reverses the string." },
      { q: "How should you check whether x is None?", options: ["x == None", "x is None", "x = None", "None(x)"], answer: 1, explain: "Use the identity operator 'is' for None." },
      { q: "What does «f\"{3.14159:.2f}\"» produce?", options: ["3.14159", "3.14", "3.1", "3"], answer: 1, explain: ".2f formats with two decimal places." },
      { q: "What happens with «s = \"hi\"; s[0] = \"H\"»?", options: ["s becomes 'Hi'", "TypeError — strings are immutable", "s becomes 'H'", "Nothing"], answer: 1, explain: "Strings can't be changed in place." },
    ],
    challenge: {
      title: "Name formatter",
      prompt: md`Given «name = "  priya ramesh  "», remove the extra spaces, convert it to title case, and print it using an **f-string** in the format «Welcome, Priya Ramesh!». Also print the name **reversed** using slicing.`,
      starter: md`name = "  priya ramesh  "
`,
      rules: [
        { re: /\.strip\s*\(\s*\)/, msg: "Remove extra spaces with .strip()" },
        { re: /\.title\s*\(\s*\)/, msg: "Convert to title case with .title()" },
        { re: /print\s*\(\s*f["']Welcome,\s*\{/, msg: 'Print with an f-string like f"Welcome, {name}!"' },
        { re: /\[\s*:\s*:\s*-1\s*\]/, msg: "Reverse the name with slicing [::-1]" },
      ],
      solution: md`name = "  priya ramesh  "
clean = name.strip().title()
print(f"Welcome, {clean}!")
print(clean[::-1])`,
    },
  },
  {
    id: "py4",
    title: "Making Decisions",
    summary: "if / elif / else, truthiness and match statements.",
    lessons: [
      {
        title: "if, elif and else",
        minutes: 15,
        body: md`~~~python
marks = 68

if marks >= 90:
    grade = "A"
elif marks >= 75:
    grade = "B"
elif marks >= 50:
    grade = "C"
else:
    grade = "F"

print(grade)   # C
~~~
- Conditions end with a colon «:».
- The body is indented.
- Only the **first** true branch runs.

### Nested conditions
~~~python
if age >= 18:
    if has_licence:
        print("You can drive")
~~~
Often clearer as «if age >= 18 and has_licence:».`,
      },
      {
        title: "Truthiness and conditional expressions",
        minutes: 15,
        body: md`### Truthy and falsy values
These are treated as **False** in conditions: «False», «None», «0», «0.0», «""», «[]», «{}», «()», «set()». Everything else is **True**.
~~~python
items = []
if not items:
    print("Cart is empty")

name = input("Name: ")
if name:
    print("Hello", name)
~~~

### Conditional expression (ternary)
~~~python
result = "Pass" if marks >= 40 else "Fail"
~~~

### Combining conditions
~~~python
if 18 <= age <= 25 and city in ("Chennai", "Madurai"):
    print("Eligible for the campus drive")
~~~`,
      },
      {
        title: "match statements (Python 3.10+)",
        minutes: 15,
        body: md`«match» compares a value against patterns — like «switch» in other languages, but more powerful.
~~~python
command = "start"

match command:
    case "start":
        print("Starting…")
    case "stop" | "quit":
        print("Stopping")
    case _:
        print("Unknown command")
~~~
«_» is the wildcard (default case).

### Matching structure
~~~python
point = (0, 5)
match point:
    case (0, 0):
        print("Origin")
    case (0, y):
        print(f"On the Y axis at {y}")
    case (x, y):
        print(f"Point at {x}, {y}")
~~~
> If you're on Python 3.9 or older, use if/elif instead.`,
      },
    ],
    quiz: [
      { q: "Which keyword means 'else if' in Python?", options: ["elseif", "else if", "elif", "elsif"], answer: 2, explain: "Python uses elif." },
      { q: "Which value is falsy?", options: ["\"0\"", "[0]", "0", "\" \""], answer: 2, explain: "The integer 0 is falsy; non-empty strings and lists are truthy." },
      { q: "What is «\"Pass\" if 35 >= 40 else \"Fail\"»?", options: ["Pass", "Fail", "True", "Error"], answer: 1, explain: "35 >= 40 is False, so the else value is used." },
      { q: "In a match statement, what does «case _:» do?", options: ["Matches only underscores", "Matches anything (default)", "Ends the match", "Is a syntax error"], answer: 1, explain: "_ is the wildcard pattern." },
      { q: "What must follow an if condition?", options: ["A semicolon", "A colon", "Curly braces", "then"], answer: 1, explain: "if, elif, else, for, while and def lines end with a colon." },
    ],
    challenge: {
      title: "Grade calculator",
      prompt: md`Given «marks = 82», use **if / elif / else** to print «A» (≥ 90), «B» (≥ 75), «C» (≥ 50) or «F».`,
      starter: md`marks = 82
`,
      rules: [
        { re: /if\s+marks\s*>=\s*90\s*:/, msg: "Start with if marks >= 90:" },
        { re: /elif\s+marks\s*>=\s*75\s*:/, msg: "Use elif marks >= 75:" },
        { re: /elif\s+marks\s*>=\s*50\s*:/, msg: "Use elif marks >= 50:" },
        { re: /else\s*:\s*\n\s+print\s*\(\s*["']F["']\s*\)/, msg: 'Finish with else: print("F")' },
      ],
      solution: md`marks = 82
if marks >= 90:
    print("A")
elif marks >= 75:
    print("B")
elif marks >= 50:
    print("C")
else:
    print("F")`,
    },
  },
  {
    id: "py5",
    title: "Loops",
    summary: "for loops with range, while loops, break, continue and nesting.",
    lessons: [
      {
        title: "for loops and range()",
        minutes: 15,
        body: md`A «for» loop iterates over any sequence.
~~~python
for ch in "Java":
    print(ch)

for course in ["Python", "SQL", "C"]:
    print(course)
~~~

### range()
- «range(5)» → 0, 1, 2, 3, 4
- «range(1, 6)» → 1 to 5
- «range(10, 0, -2)» → 10, 8, 6, 4, 2
~~~python
total = 0
for i in range(1, 101):
    total += i
print(total)   # 5050
~~~

### enumerate() — index and value together
~~~python
for i, name in enumerate(["Asha", "Ravi"], start=1):
    print(i, name)   # 1 Asha / 2 Ravi
~~~`,
      },
      {
        title: "while loops",
        minutes: 15,
        body: md`«while» repeats as long as a condition is true.
~~~python
n = 1234
digits = 0
while n > 0:
    n //= 10
    digits += 1
print(digits)   # 4
~~~

### Input validation loop
~~~python
while True:
    pin = input("Enter 4-digit PIN: ")
    if len(pin) == 4 and pin.isdigit():
        break
    print("Invalid, try again")
~~~
> Make sure something inside the loop eventually makes the condition false (or calls «break»), otherwise you get an infinite loop. Press Ctrl+C to stop one.`,
      },
      {
        title: "break, continue, else and nested loops",
        minutes: 15,
        body: md`~~~python
for i in range(1, 11):
    if i == 7:
        break          # exit the loop
    if i % 2 == 0:
        continue       # skip to next iteration
    print(i)           # 1 3 5
~~~

### Loop else
The «else» block runs only if the loop finished **without** «break» — handy for searches:
~~~python
for n in [3, 5, 7]:
    if n % 2 == 0:
        print("Found an even number")
        break
else:
    print("No even numbers")
~~~

### Nested loops and patterns
~~~python
for row in range(1, 5):
    print("* " * row)
~~~
~~~
*
* *
* * *
* * * *
~~~`,
      },
    ],
    quiz: [
      { q: "What numbers does «range(2, 6)» produce?", options: ["2,3,4,5,6", "2,3,4,5", "3,4,5,6", "2,4,6"], answer: 1, explain: "The stop value is excluded." },
      { q: "What does enumerate() give you in a for loop?", options: ["Only indexes", "Index and value pairs", "Reversed values", "Sorted values"], answer: 1, explain: "enumerate yields (index, item)." },
      { q: "When does a for loop's else block run?", options: ["Always", "When the loop ends without break", "Only after break", "Never"], answer: 1, explain: "else runs if no break occurred." },
      { q: "What does «continue» do?", options: ["Exits the loop", "Skips to the next iteration", "Restarts the loop", "Pauses"], answer: 1, explain: "continue skips the rest of the current iteration." },
      { q: "What does «print(\"ab\" * 3)» print?", options: ["ab3", "ababab", "Error", "ab ab ab"], answer: 1, explain: "Multiplying a string repeats it." },
    ],
    challenge: {
      title: "Multiplication table",
      prompt: md`Use a **for loop with range()** to print the table of 7 from 1 to 10 in the format «7 x 1 = 7».`,
      starter: md`# print the table of 7
`,
      rules: [
        { re: /for\s+(\w+)\s+in\s+range\s*\(\s*1\s*,\s*11\s*\)\s*:/, msg: "Loop with for i in range(1, 11):" },
        { re: /7\s*\*\s*\w+|\w+\s*\*\s*7/, msg: "Multiply 7 by the loop variable" },
        { re: /print\s*\(.*\bx\b/, msg: 'Print each line like "7 x i = result"' },
      ],
      solution: md`for i in range(1, 11):
    print(f"7 x {i} = {7 * i}")`,
    },
  },
  {
    id: "py6",
    title: "Lists & Tuples",
    summary: "Store ordered collections, slice them and unpack tuples.",
    lessons: [
      {
        title: "Lists",
        minutes: 15,
        body: md`A **list** is an ordered, changeable collection that can hold any types.
~~~python
marks = [78, 92, 65, 88]
print(marks[0])     # 78
print(marks[-1])    # 88
print(len(marks))   # 4

marks[2] = 70       # lists are mutable
print(marks)        # [78, 92, 70, 88]
~~~

### Looping
~~~python
for m in marks:
    print(m)
~~~

### Built-in helpers
~~~python
print(sum(marks), max(marks), min(marks))
print(sorted(marks))                 # new sorted list
print(sorted(marks, reverse=True))
~~~`,
      },
      {
        title: "List methods and slicing",
        minutes: 15,
        body: md`~~~python
langs = ["Python", "Java"]
langs.append("SQL")          # add at end
langs.insert(1, "C")         # insert at index 1
langs.extend(["Go", "Rust"]) # add many
langs.remove("Java")         # remove by value
last = langs.pop()           # remove & return last item
langs.sort()                 # sort in place
langs.reverse()
print(langs.index("SQL"), langs.count("C"))
~~~

### Slicing works like strings
~~~python
nums = [0, 1, 2, 3, 4, 5]
print(nums[1:4])    # [1, 2, 3]
print(nums[::2])    # [0, 2, 4]
copy = nums[:]      # shallow copy
~~~

> «b = a» does **not** copy a list — both names point to the same list. Use «a.copy()» or «a[:]».`,
      },
      {
        title: "Tuples and unpacking",
        minutes: 15,
        body: md`A **tuple** is like a list but **immutable** — it can't be changed after creation.
~~~python
point = (3, 4)
rgb = (255, 128, 0)
single = (5,)        # note the comma for a one-item tuple
~~~
Use tuples for fixed groups of values, like coordinates or database rows. They're slightly faster and can be dictionary keys.

### Unpacking
~~~python
x, y = point
name, age, city = ("Arun", 21, "Chennai")

first, *rest = [1, 2, 3, 4]
print(first, rest)    # 1 [2, 3, 4]
~~~

### Returning multiple values
~~~python
def min_max(nums):
    return min(nums), max(nums)

low, high = min_max([4, 9, 1])
~~~`,
      },
    ],
    quiz: [
      { q: "Which method adds an item to the end of a list?", options: ["add()", "push()", "append()", "insert()"], answer: 2, explain: "append() adds one item to the end." },
      { q: "What is the key difference between a list and a tuple?", options: ["Tuples are ordered, lists aren't", "Tuples are immutable", "Lists can't hold strings", "Tuples are always faster to change"], answer: 1, explain: "Tuples can't be modified after creation." },
      { q: "After «a = [1, 2]; b = a; b.append(3)», what is a?", options: ["[1, 2]", "[1, 2, 3]", "[3]", "Error"], answer: 1, explain: "a and b refer to the same list." },
      { q: "What is «[10, 20, 30, 40][1:3]»?", options: ["[10, 20]", "[20, 30]", "[20, 30, 40]", "[30, 40]"], answer: 1, explain: "Indexes 1 and 2." },
      { q: "How do you write a tuple with a single element 5?", options: ["(5)", "(5,)", "[5]", "tuple 5"], answer: 1, explain: "The trailing comma makes it a tuple." },
    ],
    challenge: {
      title: "Top scores",
      prompt: md`Given «scores = [56, 91, 73, 88, 64]», **append** «95», **sort** the list in descending order, and print the **top 3** scores using slicing. Expected: «[95, 91, 88]».`,
      starter: md`scores = [56, 91, 73, 88, 64]
`,
      rules: [
        { re: /scores\.append\s*\(\s*95\s*\)/, msg: "Add 95 with scores.append(95)" },
        { re: /scores\.sort\s*\(\s*reverse\s*=\s*True\s*\)|sorted\s*\(\s*scores\s*,\s*reverse\s*=\s*True\s*\)/, msg: "Sort in descending order with sort(reverse=True)" },
        { re: /\[\s*:\s*3\s*\]|\[\s*0\s*:\s*3\s*\]/, msg: "Take the first three with [:3]" },
        { re: /print\s*\(/, msg: "Print the result" },
      ],
      solution: md`scores = [56, 91, 73, 88, 64]
scores.append(95)
scores.sort(reverse=True)
print(scores[:3])`,
    },
  },
  {
    id: "py7",
    title: "Dictionaries & Sets",
    summary: "Key-value data, iteration patterns and unique collections.",
    lessons: [
      {
        title: "Dictionaries",
        minutes: 15,
        body: md`A **dict** maps unique keys to values.
~~~python
student = {"name": "Divya", "roll": 21, "dept": "CSE"}
print(student["name"])            # Divya
student["cgpa"] = 8.9             # add a new key
student["dept"] = "IT"            # update
del student["roll"]               # remove
print(len(student))
~~~

### Safe access with get()
~~~python
print(student.get("phone"))           # None instead of KeyError
print(student.get("phone", "N/A"))    # N/A
print("name" in student)              # True — checks keys
~~~
Keys must be **immutable** (str, int, tuple). Since Python 3.7 dicts keep insertion order.`,
      },
      {
        title: "Looping and dict methods",
        minutes: 15,
        body: md`~~~python
stock = {"pen": 40, "book": 15, "bag": 3}

for item in stock:                 # keys
    print(item)

for item, qty in stock.items():    # key-value pairs
    print(f"{item}: {qty}")

print(list(stock.keys()))
print(list(stock.values()))
~~~

### Counting pattern
~~~python
text = "java is fun and java is powerful"
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)   # {'java': 2, 'is': 2, 'fun': 1, ...}
~~~

### Other methods
«update()» merges another dict, «pop(key)» removes and returns a value, «setdefault(key, default)» inserts if missing.`,
      },
      {
        title: "Sets and comprehensions",
        minutes: 15,
        body: md`### Sets — unique, unordered values
~~~python
emails = {"a@x.com", "b@x.com", "a@x.com"}
print(len(emails))    # 2 — duplicates removed

a = {1, 2, 3}
b = {2, 3, 4}
print(a | b)   # union        {1, 2, 3, 4}
print(a & b)   # intersection {2, 3}
print(a - b)   # difference   {1}
~~~
Fast way to remove duplicates: «unique = list(set(items))».

### Comprehensions
Build lists, dicts and sets in one line:
~~~python
squares = [n * n for n in range(1, 6)]          # [1, 4, 9, 16, 25]
evens = [n for n in range(20) if n % 2 == 0]
lengths = {w: len(w) for w in ["py", "java"]}   # {'py': 2, 'java': 4}
~~~`,
      },
    ],
    quiz: [
      { q: "What does «d.get(\"x\", 0)» return if \"x\" is missing?", options: ["None", "0", "KeyError", "\"x\""], answer: 1, explain: "get returns the default when the key is absent." },
      { q: "Which loop gives both keys and values of a dict d?", options: ["for k in d", "for k, v in d.items()", "for v in d.values()", "for k, v in d"], answer: 1, explain: ".items() yields key-value pairs." },
      { q: "What is «len({1, 1, 2, 2, 3})»?", options: ["5", "3", "2", "1"], answer: 1, explain: "Sets keep only unique values." },
      { q: "What does «[n * 2 for n in range(3)]» produce?", options: ["[2, 4, 6]", "[0, 2, 4]", "[0, 1, 2]", "[1, 2, 3]"], answer: 1, explain: "range(3) is 0, 1, 2; each is doubled." },
      { q: "Which can NOT be a dictionary key?", options: ["\"name\"", "42", "(1, 2)", "[1, 2]"], answer: 3, explain: "Lists are mutable, so they can't be keys." },
    ],
    challenge: {
      title: "Word frequency",
      prompt: md`Given «text = "python is fun and python is powerful"», count how many times each word appears using a **dictionary** and «.get()». Print the dictionary.`,
      starter: md`text = "python is fun and python is powerful"
`,
      rules: [
        { re: /\w+\s*=\s*\{\s*\}|\w+\s*=\s*dict\s*\(\s*\)/, msg: "Start with an empty dictionary: counts = {}" },
        { re: /for\s+\w+\s+in\s+text\.split\s*\(/, msg: "Loop over text.split()" },
        { re: /\.get\s*\(\s*\w+\s*,\s*0\s*\)\s*\+\s*1/, msg: "Increase the count with counts.get(word, 0) + 1" },
        { re: /print\s*\(\s*\w+\s*\)/, msg: "Print the dictionary" },
      ],
      solution: md`text = "python is fun and python is powerful"
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)`,
    },
  },
  {
    id: "py8",
    title: "Functions",
    summary: "def, return, arguments, scope, lambdas and recursion.",
    lessons: [
      {
        title: "Defining functions",
        minutes: 15,
        body: md`~~~python
def greet(name):
    """Return a greeting for name."""
    return f"Hello, {name}!"

message = greet("Kavin")
print(message)
~~~
- «def» starts a function; the body is indented.
- «return» sends a value back. A function without «return» returns «None».
- The triple-quoted string is a **docstring** — shown by «help(greet)».

### Why functions?
They make code reusable, testable and easier to read. A good function does **one** thing and has a descriptive name like «calculate_gst» or «is_valid_email».`,
      },
      {
        title: "Arguments: defaults, keywords, *args and **kwargs",
        minutes: 15,
        body: md`~~~python
def make_order(item, qty=1, express=False):
    return f"{qty} x {item}" + (" (express)" if express else "")

make_order("pen")                       # default qty
make_order("book", 3)                   # positional
make_order(item="bag", express=True)    # keyword arguments
~~~

### Variable numbers of arguments
~~~python
def total(*nums):           # nums is a tuple
    return sum(nums)
total(1, 2, 3, 4)           # 10

def profile(**info):        # info is a dict
    for k, v in info.items():
        print(k, "=", v)
profile(name="Asha", city="Trichy")
~~~

> Never use a mutable default like «def f(items=[])» — the same list is shared across calls. Use «items=None» and create the list inside.`,
      },
      {
        title: "Scope, lambda and recursion",
        minutes: 15,
        body: md`### Scope
Variables created inside a function are **local**. Reading a global is fine; to reassign one, declare «global» (best avoided).
~~~python
count = 0
def inc():
    global count
    count += 1
~~~

### lambda — small anonymous functions
~~~python
square = lambda x: x * x
students = [("Ravi", 72), ("Anu", 91)]
students.sort(key=lambda s: s[1], reverse=True)
~~~

### Recursion
~~~python
def factorial(n):
    if n <= 1:              # base case
        return 1
    return n * factorial(n - 1)

print(factorial(5))   # 120
~~~
Python limits recursion depth (about 1000 by default), so loops are better for very deep problems.`,
      },
    ],
    quiz: [
      { q: "What does a function return if it has no return statement?", options: ["0", "None", "\"\"", "An error"], answer: 1, explain: "Functions return None by default." },
      { q: "In «def f(*args)», what type is args?", options: ["list", "tuple", "dict", "set"], answer: 1, explain: "*args collects positional arguments into a tuple." },
      { q: "What is «(lambda x: x + 10)(5)»?", options: ["5", "10", "15", "Error"], answer: 2, explain: "The lambda adds 10 to its argument." },
      { q: "Why is «def f(items=[])» risky?", options: ["It's a syntax error", "The same list is reused across calls", "Lists can't be arguments", "It's slow"], answer: 1, explain: "Default values are created once, so the list is shared." },
      { q: "What is required in every recursive function?", options: ["A loop", "A global variable", "A base case", "A lambda"], answer: 2, explain: "Without a base case the recursion never stops." },
    ],
    challenge: {
      title: "Recursive factorial",
      prompt: md`Write a **recursive** function «factorial(n)» with a base case, and print «factorial(10)» (expected «3628800»). Don't use loops.`,
      starter: md`# define factorial here
`,
      rules: [
        { re: /def\s+factorial\s*\(\s*\w+\s*\)\s*:/, msg: "Define def factorial(n):" },
        { re: /if\s+\w+\s*(<=\s*1|==\s*0|==\s*1|<\s*2)\s*:/, msg: "Add a base case like if n <= 1:" },
        { re: /return\s+\w+\s*\*\s*factorial\s*\(\s*\w+\s*-\s*1\s*\)/, msg: "Recursive case: return n * factorial(n - 1)" },
        { re: /print\s*\(\s*factorial\s*\(\s*10\s*\)\s*\)/, msg: "Print factorial(10)" },
      ],
      forbid: [{ re: /\b(for|while)\b/, msg: "Use recursion, not a loop" }],
      solution: md`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(10))`,
    },
  },
  {
    id: "py9",
    title: "Modules, Files & Exceptions",
    summary: "Reuse code with imports, read/write files and handle errors.",
    lessons: [
      {
        title: "Modules and packages",
        minutes: 15,
        body: md`A **module** is a «.py» file. Import code from it instead of copying it.
~~~python
import math
print(math.sqrt(16), math.pi)

from random import randint, choice
print(randint(1, 6), choice(["heads", "tails"]))

import datetime as dt
print(dt.date.today())
~~~

### Your own module
If «helpers.py» contains «def add(a, b): ...», another file in the same folder can do «from helpers import add».

### Installing packages with pip
~~~bash
pip install requests
~~~

### The main guard
~~~python
if __name__ == "__main__":
    main()
~~~
This code runs only when the file is executed directly, not when it's imported.`,
      },
      {
        title: "Reading and writing files",
        minutes: 15,
        body: md`Use «with open(...)» — it closes the file automatically.
~~~python
# write (overwrites the file)
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("Learning Python at Journify\n")

# append
with open("notes.txt", "a", encoding="utf-8") as f:
    f.write("Second line\n")

# read everything
with open("notes.txt", encoding="utf-8") as f:
    content = f.read()

# read line by line
with open("notes.txt", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
~~~
Modes: «"r"» read (default), «"w"» write, «"a"» append, «"rb"»/«"wb"» binary.

### CSV files
~~~python
import csv
with open("marks.csv", newline="") as f:
    for row in csv.DictReader(f):
        print(row["name"], row["marks"])
~~~`,
      },
      {
        title: "Handling exceptions",
        minutes: 15,
        body: md`~~~python
try:
    age = int(input("Age: "))
    print(100 / age)
except ValueError:
    print("Please enter a number")
except ZeroDivisionError:
    print("Age can't be zero")
else:
    print("No errors!")          # runs if nothing failed
finally:
    print("Always runs")
~~~

### Common exceptions
«ValueError», «TypeError», «KeyError», «IndexError», «ZeroDivisionError», «FileNotFoundError», «AttributeError».

### Raising and custom exceptions
~~~python
class InsufficientFunds(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds("Balance too low")
    return balance - amount
~~~
> Catch **specific** exceptions. A bare «except:» hides real bugs.`,
      },
    ],
    quiz: [
      { q: "How do you import only sqrt from the math module?", options: ["import sqrt", "from math import sqrt", "import math.sqrt as sqrt only", "using math.sqrt"], answer: 1, explain: "from module import name." },
      { q: "Which file mode adds to the end of an existing file?", options: ["\"r\"", "\"w\"", "\"a\"", "\"x\""], answer: 2, explain: "\"a\" appends; \"w\" overwrites." },
      { q: "Why use «with open(...) as f»?", options: ["It's faster", "The file is closed automatically", "It reads binary only", "It's required by Python"], answer: 1, explain: "The context manager closes the file even if an error occurs." },
      { q: "Which exception does «int(\"abc\")» raise?", options: ["TypeError", "ValueError", "KeyError", "SyntaxError"], answer: 1, explain: "The type is right (str) but the value can't be converted." },
      { q: "When does the else block of a try statement run?", options: ["Always", "Only if an exception occurred", "Only if no exception occurred", "Never"], answer: 2, explain: "else runs when the try block succeeds." },
    ],
    challenge: {
      title: "Safe division",
      prompt: md`Write a function «safe_divide(a, b)» that returns «a / b». Use **try / except ZeroDivisionError** to print «Cannot divide by zero» and return «0». Print «safe_divide(10, 0)».`,
      starter: md`# define safe_divide here
`,
      rules: [
        { re: /def\s+safe_divide\s*\(\s*\w+\s*,\s*\w+\s*\)\s*:/, msg: "Define def safe_divide(a, b):" },
        { re: /try\s*:/, msg: "Use a try: block" },
        { re: /except\s+ZeroDivisionError/, msg: "Catch ZeroDivisionError" },
        { re: /["']Cannot divide by zero["']/, msg: 'Print "Cannot divide by zero"' },
        { re: /return\s+0\b/, msg: "Return 0 when division fails" },
        { re: /safe_divide\s*\(\s*10\s*,\s*0\s*\)/, msg: "Call safe_divide(10, 0)" },
      ],
      solution: md`def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("Cannot divide by zero")
        return 0

print(safe_divide(10, 0))`,
    },
  },
  {
    id: "py10",
    title: "Object-Oriented Programming",
    summary: "Classes, objects, inheritance and special methods.",
    lessons: [
      {
        title: "Classes and objects",
        minutes: 15,
        body: md`~~~python
class Student:
    college = "Journify Academy"          # class attribute (shared)

    def __init__(self, name, marks):      # constructor
        self.name = name                  # instance attributes
        self.marks = marks

    def is_passed(self):
        return self.marks >= 40

s1 = Student("Divya", 91)
s2 = Student("Karthik", 35)
print(s1.name, s1.is_passed())   # Divya True
print(s2.is_passed())            # False
~~~
- «__init__» runs when an object is created.
- «self» is the current object — always the first parameter of instance methods.
- Each object has its own instance attributes.`,
      },
      {
        title: "Inheritance and polymorphism",
        minutes: 15,
        body: md`~~~python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def role(self):
        return "Employee"

class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)    # call parent constructor
        self.team_size = team_size

    def role(self):                       # override
        return "Manager"

staff = [Employee("Asha", 40000), Manager("Ravi", 90000, 6)]
for person in staff:
    print(person.name, person.role())    # polymorphism
~~~
«isinstance(obj, Employee)» checks the type, including subclasses. Python also supports multiple inheritance: «class C(A, B):».`,
      },
      {
        title: "Encapsulation and special methods",
        minutes: 15,
        body: md`### Private by convention
A leading underscore «_balance» means "internal — don't touch". Use «@property» for controlled access:
~~~python
class Account:
    def __init__(self):
        self._balance = 0

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
~~~

### Dunder (double-underscore) methods
~~~python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __str__(self):
        return f"({self.x}, {self.y})"
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)
    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)

print(Point(1, 2) + Point(3, 4))   # (4, 6)
~~~
### dataclasses
«from dataclasses import dataclass» then «@dataclass» generates «__init__», «__repr__» and «__eq__» for you.`,
      },
    ],
    quiz: [
      { q: "Which method runs automatically when an object is created?", options: ["__new__ only", "__init__", "__start__", "create()"], answer: 1, explain: "__init__ initialises new objects." },
      { q: "What does self refer to inside a method?", options: ["The class", "The current object", "The parent class", "The module"], answer: 1, explain: "self is the instance the method was called on." },
      { q: "How do you call the parent constructor in a subclass?", options: ["parent.__init__()", "super().__init__(...)", "self.__init__()", "base()"], answer: 1, explain: "super() gives access to the parent class." },
      { q: "Which method controls what print(obj) shows?", options: ["__print__", "__str__", "__show__", "__init__"], answer: 1, explain: "print uses __str__." },
      { q: "What does a leading underscore like «_balance» indicate?", options: ["A syntax error", "A constant", "Internal use by convention", "A global"], answer: 2, explain: "It's a convention meaning 'internal'." },
    ],
    challenge: {
      title: "Student class",
      prompt: md`Create a class «Student» with an «__init__» that stores «name» and «marks», a method «grade()» that returns «"Pass"» if marks ≥ 40 else «"Fail"», and a «__str__» that returns something like «Divya: 91». Create an object and print it and its grade.`,
      starter: md`class Student:
    pass
`,
      rules: [
        { re: /class\s+Student\s*(\(\s*\))?\s*:/, msg: "Define class Student:" },
        { re: /def\s+__init__\s*\(\s*self\s*,\s*\w+\s*,\s*\w+\s*\)\s*:/, msg: "Add def __init__(self, name, marks):" },
        { re: /self\.name\s*=\s*\w+/, msg: "Store self.name" },
        { re: /self\.marks\s*=\s*\w+/, msg: "Store self.marks" },
        { re: /def\s+grade\s*\(\s*self\s*\)\s*:[\s\S]*self\.marks\s*>=\s*40/, msg: "Add grade(self) that checks self.marks >= 40" },
        { re: /def\s+__str__\s*\(\s*self\s*\)\s*:[\s\S]*return/, msg: "Add __str__(self) that returns a string" },
        { re: /=\s*Student\s*\(/, msg: "Create a Student object" },
        { re: /\.grade\s*\(\s*\)/, msg: "Call .grade() and print it" },
      ],
      solution: md`class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def grade(self):
        return "Pass" if self.marks >= 40 else "Fail"

    def __str__(self):
        return f"{self.name}: {self.marks}"

s = Student("Divya", 91)
print(s)
print(s.grade())`,
    },
  },
  {
    id: "py11",
    title: "Iterators, Generators & Decorators",
    summary: "Pythonic power tools for clean, memory-efficient code.",
    lessons: [
      {
        title: "Iterables and iterators",
        minutes: 15,
        body: md`Anything you can loop over is an **iterable** (lists, strings, dicts, files). Python gets an **iterator** from it with «iter()» and calls «next()» until «StopIteration».
~~~python
it = iter([10, 20, 30])
print(next(it))   # 10
print(next(it))   # 20
~~~

### Handy built-ins
~~~python
names = ["Asha", "Ravi"]
marks = [91, 78]
for n, m in zip(names, marks):
    print(n, m)

print(list(map(str.upper, names)))            # ['ASHA', 'RAVI']
print(list(filter(lambda m: m > 80, marks)))  # [91]
print(any(m > 90 for m in marks), all(m > 50 for m in marks))
~~~`,
      },
      {
        title: "Generators",
        minutes: 15,
        body: md`A **generator** produces values lazily, one at a time, using «yield». It doesn't build the whole list in memory.
~~~python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for x in countdown(3):
    print(x)   # 3 2 1
~~~

### Generator expressions
Like list comprehensions but with parentheses:
~~~python
total = sum(n * n for n in range(1_000_000))   # no giant list created
~~~

### Why it matters
Reading a 5 GB log file line by line with a generator uses almost no memory:
~~~python
def errors(path):
    with open(path) as f:
        for line in f:
            if "ERROR" in line:
                yield line
~~~`,
      },
      {
        title: "Decorators and context managers",
        minutes: 15,
        body: md`### Decorators
A decorator wraps a function to add behaviour — logging, timing, access checks.
~~~python
import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.perf_counter() - start:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

slow_sum(1_000_000)
~~~
Frameworks use decorators heavily, e.g. «@app.route("/")» in Flask.

### Context managers
«with» guarantees setup and cleanup. You can write your own:
~~~python
from contextlib import contextmanager

@contextmanager
def announce(task):
    print("Start:", task)
    yield
    print("Done:", task)

with announce("backup"):
    print("working…")
~~~`,
      },
    ],
    quiz: [
      { q: "Which keyword turns a function into a generator?", options: ["return", "yield", "async", "generate"], answer: 1, explain: "Any function containing yield is a generator." },
      { q: "What does «list(zip([1, 2], [\"a\", \"b\"]))» return?", options: ["[1, 2, 'a', 'b']", "[(1, 'a'), (2, 'b')]", "{1: 'a', 2: 'b'}", "Error"], answer: 1, explain: "zip pairs items by position." },
      { q: "Main advantage of a generator over a list?", options: ["It's sorted", "It uses less memory by producing items lazily", "It can be indexed", "It's mutable"], answer: 1, explain: "Generators create values on demand." },
      { q: "What does «@timer» above a function do?", options: ["Comments it out", "Wraps the function with the timer decorator", "Makes it async", "Runs it on a timer"], answer: 1, explain: "It's shorthand for func = timer(func)." },
      { q: "What is «any([False, 0, 3])»?", options: ["False", "True", "3", "Error"], answer: 1, explain: "any is True if at least one item is truthy (3)." },
    ],
    challenge: {
      title: "Even squares generator",
      prompt: md`Write a **generator function** «even_squares(n)» that **yields** the square of every even number from 0 up to «n» (inclusive). Print «list(even_squares(10))» → «[0, 4, 16, 36, 64, 100]».`,
      starter: md`# define even_squares here
`,
      rules: [
        { re: /def\s+even_squares\s*\(\s*\w+\s*\)\s*:/, msg: "Define def even_squares(n):" },
        { re: /yield\s+\w+\s*(\*\s*\w+|\*\*\s*2)/, msg: "yield the square (e.g. yield i * i)" },
        { re: /%\s*2\s*==\s*0|range\s*\(\s*0\s*,\s*\w+\s*\+\s*1\s*,\s*2\s*\)/, msg: "Only even numbers (i % 2 == 0 or a step of 2)" },
        { re: /print\s*\(\s*list\s*\(\s*even_squares\s*\(\s*10\s*\)\s*\)\s*\)/, msg: "Print list(even_squares(10))" },
      ],
      forbid: [{ re: /return\s*\[/, msg: "Use yield instead of returning a list" }],
      solution: md`def even_squares(n):
    for i in range(n + 1):
        if i % 2 == 0:
            yield i * i

print(list(even_squares(10)))`,
    },
  },
  {
    id: "py12",
    title: "Practical Python & the Ecosystem",
    summary: "Standard library essentials, virtual environments and popular libraries.",
    lessons: [
      {
        title: "Standard library essentials",
        minutes: 15,
        body: md`### datetime
~~~python
from datetime import datetime, timedelta
now = datetime.now()
print(now.strftime("%d-%m-%Y %H:%M"))
deadline = now + timedelta(days=7)
~~~

### json
~~~python
import json
data = {"name": "Asha", "skills": ["Python", "SQL"]}
text = json.dumps(data, indent=2)     # dict → JSON string
back = json.loads(text)               # JSON string → dict
~~~

### collections
~~~python
from collections import Counter, defaultdict
print(Counter("mississippi").most_common(2))   # [('i', 4), ('s', 4)]
groups = defaultdict(list)
groups["CSE"].append("Ravi")
~~~

### pathlib and os
~~~python
from pathlib import Path
for p in Path(".").glob("*.py"):
    print(p.name)
~~~`,
      },
      {
        title: "Virtual environments and pip",
        minutes: 15,
        body: md`Each project should have its own **virtual environment** so package versions don't clash.
~~~bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install requests pandas
pip freeze > requirements.txt     # save versions
pip install -r requirements.txt   # recreate elsewhere
~~~

### Calling a web API with requests
~~~python
import requests
res = requests.get("https://api.github.com/users/octocat", timeout=10)
if res.ok:
    user = res.json()
    print(user["name"], user["public_repos"])
~~~
> Never commit «.venv» to Git — add it to «.gitignore» and share «requirements.txt» instead.`,
      },
      {
        title: "Where to go next: data, web and automation",
        minutes: 15,
        body: md`### Data analysis with pandas
~~~python
import pandas as pd
df = pd.read_csv("marks.csv")
print(df.head())
print(df["marks"].mean())
print(df[df["marks"] > 80].sort_values("marks", ascending=False))
df.groupby("dept")["marks"].mean().plot(kind="bar")
~~~

### NumPy for fast numeric arrays
~~~python
import numpy as np
a = np.array([1, 2, 3])
print(a * 10, a.mean())
~~~

### Web APIs with Flask
~~~python
from flask import Flask
app = Flask(__name__)

@app.route("/hello/<name>")
def hello(name):
    return {"message": f"Hello, {name}"}
~~~

### Career paths
- **Data analyst / scientist** — pandas, NumPy, Matplotlib, scikit-learn
- **Backend developer** — Django, FastAPI, SQL
- **Automation / QA** — Selenium, pytest
- **AI / ML engineer** — PyTorch, TensorFlow`,
      },
    ],
    quiz: [
      { q: "Which module converts between Python dicts and JSON text?", options: ["pickle", "json", "csv", "os"], answer: 1, explain: "json.dumps and json.loads." },
      { q: "What does «Counter(\"aab\")[\"a\"]» return?", options: ["1", "2", "3", "\"a\""], answer: 1, explain: "Counter counts occurrences." },
      { q: "Why use a virtual environment?", options: ["To run Python faster", "To isolate each project's packages", "To write GUI apps", "It's required to print"], answer: 1, explain: "venvs prevent version conflicts between projects." },
      { q: "Which command saves installed package versions to a file?", options: ["pip save", "pip freeze > requirements.txt", "pip export", "python -m save"], answer: 1, explain: "pip freeze lists installed packages with versions." },
      { q: "Which library is most used for tabular data analysis?", options: ["requests", "pandas", "flask", "pytest"], answer: 1, explain: "pandas provides DataFrames for tabular data." },
    ],
    challenge: {
      title: "JSON report",
      prompt: md`Given «students = [{"name": "Asha", "marks": 91}, {"name": "Ravi", "marks": 67}, {"name": "Divya", "marks": 84}]», use a **list comprehension** to collect the names of students with marks ≥ 80, then use **json.dumps** to print «{"toppers": [...], "count": 2}».`,
      starter: md`import json

students = [{"name": "Asha", "marks": 91}, {"name": "Ravi", "marks": 67}, {"name": "Divya", "marks": 84}]
`,
      rules: [
        { re: /import\s+json/, msg: "import json" },
        { re: /\[\s*\w+\s*\[\s*["']name["']\s*\]\s+for\s+\w+\s+in\s+students\s+if\s+\w+\s*\[\s*["']marks["']\s*\]\s*>=\s*80\s*\]/, msg: 'Use a list comprehension: [s["name"] for s in students if s["marks"] >= 80]' },
        { re: /["']toppers["']\s*:/, msg: 'Build a dict with a "toppers" key' },
        { re: /["']count["']\s*:\s*len\s*\(/, msg: 'Add "count" using len()' },
        { re: /print\s*\(\s*json\.dumps\s*\(/, msg: "Print the result with json.dumps()" },
      ],
      solution: md`import json

students = [{"name": "Asha", "marks": 91}, {"name": "Ravi", "marks": 67}, {"name": "Divya", "marks": 84}]
toppers = [s["name"] for s in students if s["marks"] >= 80]
print(json.dumps({"toppers": toppers, "count": len(toppers)}))`,
    },
  },
];

const FINAL_EXAM = [
  { q: "What defines a code block in Python?", options: ["Braces", "Indentation", "Semicolons", "Parentheses"], answer: 1, explain: "Indentation groups statements." },
  { q: "What is «10 / 4»?", options: ["2", "2.5", "3", "2.0"], answer: 1, explain: "/ is true division and returns a float." },
  { q: "What is «\"Journify\"[-3:]»?", options: ["Jou", "ify", "nif", "fy"], answer: 1, explain: "The last three characters." },
  { q: "Which collection type is immutable?", options: ["list", "dict", "set", "tuple"], answer: 3, explain: "Tuples can't be changed." },
  { q: "What does «{\"a\": 1}.get(\"b\")» return?", options: ["0", "None", "KeyError", "\"b\""], answer: 1, explain: "get returns None for missing keys by default." },
  { q: "What is «[x for x in range(5) if x % 2]»?", options: ["[0, 2, 4]", "[1, 3]", "[1, 2, 3, 4]", "[]"], answer: 1, explain: "x % 2 is truthy for odd numbers." },
  { q: "Which loop construct runs its else block only when no break occurs?", options: ["if/else", "for/else", "try/else only", "None"], answer: 1, explain: "Loops can have an else clause." },
  { q: "What does «def f(**kw)» collect?", options: ["Positional args as a tuple", "Keyword args as a dict", "A list", "Nothing"], answer: 1, explain: "**kwargs gathers keyword arguments." },
  { q: "Which statement correctly opens a file and closes it automatically?", options: ["open('f.txt').close()", "with open('f.txt') as f:", "file('f.txt')", "read('f.txt')"], answer: 1, explain: "The with statement manages the file." },
  { q: "Which exception is raised by «[1, 2][5]»?", options: ["KeyError", "IndexError", "ValueError", "TypeError"], answer: 1, explain: "Accessing an index that doesn't exist." },
  { q: "In a class, what is the first parameter of an instance method?", options: ["this", "self", "cls", "obj"], answer: 1, explain: "By convention it's self." },
  { q: "How does a subclass call its parent's __init__?", options: ["Parent()", "super().__init__()", "self.parent()", "base.__init__"], answer: 1, explain: "super() refers to the parent class." },
  { q: "What does a generator function use to produce values?", options: ["return", "yield", "emit", "print"], answer: 1, explain: "yield produces values lazily." },
  { q: "What is the purpose of «if __name__ == \"__main__\":»?", options: ["Defines the main class", "Runs code only when the file is executed directly", "Imports main", "Required for every file"], answer: 1, explain: "It prevents code from running on import." },
  { q: "Which tool installs third-party Python packages?", options: ["npm", "pip", "apt", "gem"], answer: 1, explain: "pip installs packages from PyPI." },
];

export const PYTHON_COURSE = {
  id: "python",
  slug: "python",
  title: "Python Programming",
  topics: "Core Python, Data Structures, Functions, File Handling, Object-Oriented Programming and Generators",
  hours: 12,
  passPercent: 70,
  storageKey: "journify.course.python.v1",
  lang: "python",
  fileName: "main.py",
  icon: "Py",
  tagline: "From your first print() to OOP, generators and real-world libraries.",
  modules: MODULES,
  finalExam: FINAL_EXAM,
};
