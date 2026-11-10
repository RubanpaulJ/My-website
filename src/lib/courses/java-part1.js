// Java course, modules 1–6. Lesson bodies use a tiny markdown: paragraphs, "- " lists,
// "### " headings, "> " tips, ~~~ code fences, «inline code» and **bold**.
const md = String.raw;

export const MODULES_1 = [
  {
    id: "m1",
    title: "Getting Started with Java",
    summary: "What Java is, how it runs, and your first program.",
    lessons: [
      {
        title: "What is Java?",
        minutes: 15,
        body: md`Java is a **general-purpose, object-oriented programming language** created at Sun Microsystems in 1995 and now maintained by Oracle and the OpenJDK community. It powers Android apps, banking systems, enterprise web servers, big-data tools like Hadoop, and much more.

### Write once, run anywhere
Java source code is compiled into **bytecode** (a «.class» file), not into machine code for one specific computer. That bytecode runs on the **Java Virtual Machine (JVM)**, and there is a JVM for Windows, macOS, Linux and more. So the same compiled program runs everywhere.

### JDK, JRE and JVM
- **JVM** (Java Virtual Machine) — runs the bytecode.
- **JRE** (Java Runtime Environment) — the JVM plus the standard libraries needed to *run* Java programs.
- **JDK** (Java Development Kit) — the JRE plus tools to *develop* programs, such as the compiler «javac».

> As a developer you install the **JDK**. Get a recent LTS version (Java 17 or 21) from adoptium.net or oracle.com.

### Why learn Java?
- Strongly typed — many mistakes are caught before the program runs.
- Huge ecosystem of libraries and frameworks (Spring, Hibernate, Android SDK).
- One of the most requested languages in placement interviews and industry jobs.`,
      },
      {
        title: "Your first Java program",
        minutes: 15,
        body: md`Every Java program lives inside a **class**. Execution starts at a special method called «main».

~~~java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
~~~

### Line by line
- «public class Hello» — declares a class named «Hello». The file **must** be named «Hello.java».
- «public static void main(String[] args)» — the entry point. The JVM calls this method first.
- «System.out.println(...)» — prints text followed by a new line.
- Every statement ends with a semicolon «;».
- Curly braces «{ }» group code into blocks.

> Java is **case-sensitive**: «Main», «main» and «MAIN» are three different names.

### print vs println
~~~java
System.out.print("Hello ");
System.out.print("there");
System.out.println("!");   // prints: Hello there!
~~~
«print» keeps the cursor on the same line; «println» moves to the next line afterwards.`,
      },
      {
        title: "Compiling, running & comments",
        minutes: 15,
        body: md`### Compile and run from the terminal
~~~bash
javac Hello.java     # compiles to Hello.class (bytecode)
java Hello           # runs the class on the JVM
~~~
Since Java 11 you can also run a single file directly: «java Hello.java».

### Comments
Comments are ignored by the compiler and explain your code to humans.
~~~java
// single-line comment

/* multi-line
   comment */

/** Javadoc comment — used to generate documentation */
~~~

### Common beginner errors
- **Missing semicolon** → «error: ';' expected».
- **File name doesn't match the public class** → «class Hello is public, should be declared in a file named Hello.java».
- **Wrong capitalisation** → «system.out.println» fails; it must be «System».

> Read compiler errors from the **first** one. Later errors are often caused by the first.

### IDEs
You can write Java in any text editor, but an IDE such as **IntelliJ IDEA**, **Eclipse** or **VS Code** with the Java extension gives you auto-complete, error highlighting and a run button.`,
      },
    ],
    quiz: [
      {
        q: "What does the Java compiler (javac) produce?",
        options: ["Machine code for your CPU", "Bytecode in a .class file", "A .exe file", "HTML"],
        answer: 1,
        explain: "javac compiles .java source into platform-independent bytecode stored in .class files.",
      },
      {
        q: "Which component actually executes Java bytecode?",
        options: ["JDK", "javac", "JVM", "IDE"],
        answer: 2,
        explain: "The Java Virtual Machine (JVM) loads and executes bytecode.",
      },
      {
        q: "A file contains «public class Student». What must the file be named?",
        options: ["student.java", "Student.class", "Main.java", "Student.java"],
        answer: 3,
        explain: "A public class must be in a file with exactly the same name plus .java.",
      },
      {
        q: "Which is the correct main method signature?",
        options: [
          "public static void main(String[] args)",
          "public void main(String args)",
          "static public int main()",
          "void main(String[] args) public",
        ],
        answer: 0,
        explain: "The JVM looks for public static void main(String[] args).",
      },
      {
        q: "What does «System.out.print(\"A\"); System.out.println(\"B\");» print?",
        options: ["A and B on separate lines", "AB", "BA", "A B"],
        answer: 1,
        explain: "print does not add a newline, so A and B appear together: AB.",
      },
    ],
    challenge: {
      title: "Hello, Journify!",
      prompt: md`Write a complete Java program with a class named «Main» that prints exactly two lines:
~~~
Hello, Journify!
I am learning Java
~~~`,
      starter: `public class Main {
    public static void main(String[] args) {
        // write your code here
    }
}`,
      rules: [
        { re: /public\s+class\s+Main\b/, msg: "Declare a public class named Main" },
        { re: /public\s+static\s+void\s+main\s*\(\s*String\s*(\[\]\s*\w+|\w+\s*\[\])\s*\)/, msg: "Include the main method: public static void main(String[] args)" },
        { re: /System\.out\.println\s*\(\s*"Hello, Journify!"\s*\)\s*;/, msg: 'Print "Hello, Journify!" with System.out.println' },
        { re: /System\.out\.println\s*\(\s*"I am learning Java"\s*\)\s*;/, msg: 'Print "I am learning Java" on the second line' },
      ],
      solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Journify!");
        System.out.println("I am learning Java");
    }
}`,
    },
  },

  {
    id: "m2",
    title: "Variables & Data Types",
    summary: "Store data with primitive types, Strings, constants and casting.",
    lessons: [
      {
        title: "Variables and primitive types",
        minutes: 15,
        body: md`A **variable** is a named box that stores a value. In Java every variable has a **type** that decides what it can hold.

~~~java
int age = 20;
double cgpa = 8.75;
char grade = 'A';
boolean isPlaced = false;
~~~

### The 8 primitive types
- «byte» — 8-bit integer (−128 to 127)
- «short» — 16-bit integer
- «int» — 32-bit integer (most common for whole numbers)
- «long» — 64-bit integer, write literals with «L»: «long views = 9000000000L;»
- «float» — 32-bit decimal, write with «f»: «float price = 99.5f;»
- «double» — 64-bit decimal (default for decimals)
- «char» — a single Unicode character in single quotes: «'J'»
- «boolean» — «true» or «false»

> Declare first, assign later: «int marks; marks = 90;» — but a local variable **must** be assigned before it is used.`,
      },
      {
        title: "Strings, var and constants",
        minutes: 15,
        body: md`### String
«String» is not a primitive — it's a class — but it's so common it gets special syntax with double quotes.
~~~java
String name = "Priya";
String greeting = "Hello, " + name;   // concatenation
System.out.println(greeting.length()); // 12
~~~

### var (Java 10+)
Inside methods you can let the compiler infer the type:
~~~java
var count = 10;        // int
var city = "Chennai";  // String
~~~
The type is still fixed at compile time — «var» just saves typing.

### Constants with final
~~~java
final double PI = 3.14159;
PI = 3;   // compile error: cannot assign a value to final variable
~~~

### Naming conventions
- Variables and methods: **camelCase** — «studentName», «totalMarks».
- Classes: **PascalCase** — «StudentRecord».
- Constants: **UPPER_SNAKE_CASE** — «MAX_SIZE».
- Names can't start with a digit or be a keyword like «class» or «int».`,
      },
      {
        title: "Type casting and conversion",
        minutes: 15,
        body: md`### Widening (automatic)
A smaller type fits safely into a larger one:
~~~java
int i = 100;
long l = i;      // int → long
double d = l;    // long → double
~~~

### Narrowing (manual cast)
Going to a smaller type may lose data, so you must cast explicitly:
~~~java
double price = 99.99;
int rupees = (int) price;   // 99 — decimal part is dropped
~~~

### Integer division trap
~~~java
int a = 7, b = 2;
System.out.println(a / b);           // 3, not 3.5
System.out.println((double) a / b);  // 3.5
~~~

### Converting Strings to numbers and back
~~~java
int n = Integer.parseInt("42");
double x = Double.parseDouble("3.5");
String s = String.valueOf(100);   // or "" + 100
~~~
> «Integer.parseInt("abc")» throws a «NumberFormatException». You'll learn to handle that in the Exceptions module.`,
      },
    ],
    quiz: [
      {
        q: "Which type is best for storing a student's CGPA like 8.75?",
        options: ["int", "char", "double", "boolean"],
        answer: 2,
        explain: "Decimal values are stored in double (or float).",
      },
      {
        q: "What is printed by «System.out.println(7 / 2);»?",
        options: ["3.5", "3", "4", "Compile error"],
        answer: 1,
        explain: "Both operands are int, so integer division truncates to 3.",
      },
      {
        q: "Which declaration is a valid long literal?",
        options: ["long x = 9000000000;", "long x = 9000000000L;", "long x = \"9000000000\";", "long x = 9.0L;"],
        answer: 1,
        explain: "Integer literals beyond int range need the L suffix.",
      },
      {
        q: "What does the final keyword do on a variable?",
        options: ["Makes it global", "Deletes it at the end", "Prevents it from being reassigned", "Makes it a String"],
        answer: 2,
        explain: "A final variable can be assigned only once.",
      },
      {
        q: "What is «(int) 9.99»?",
        options: ["10", "9", "9.99", "Compile error"],
        answer: 1,
        explain: "Casting to int drops the decimal part (truncation), giving 9.",
      },
    ],
    challenge: {
      title: "Student profile",
      prompt: md`Inside «main», create these variables and print them:
- an «int» named «age» with value «20»
- a «double» named «cgpa» with value «8.5»
- a «String» named «name» with your name
- a «boolean» named «isPlaced»

Print a line like «Name: Priya, Age: 20, CGPA: 8.5» using string concatenation with «+».`,
      starter: `public class Main {
    public static void main(String[] args) {
        // declare your variables here

    }
}`,
      rules: [
        { re: /\bint\s+age\s*=\s*20\s*;/, msg: "Declare int age = 20;" },
        { re: /\bdouble\s+cgpa\s*=\s*8\.5\s*;/, msg: "Declare double cgpa = 8.5;" },
        { re: /\bString\s+name\s*=\s*"[^"]+"\s*;/, msg: 'Declare String name = "..."; with your name' },
        { re: /\bboolean\s+isPlaced\s*=\s*(true|false)\s*;/, msg: "Declare boolean isPlaced = true or false;" },
        { re: /System\.out\.println\s*\([^;]*\+\s*name|System\.out\.println\s*\([^;]*name\s*\+/, msg: "Print the values using + concatenation (include name)" },
      ],
      solution: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        double cgpa = 8.5;
        String name = "Priya";
        boolean isPlaced = false;
        System.out.println("Name: " + name + ", Age: " + age + ", CGPA: " + cgpa);
    }
}`,
    },
  },

  {
    id: "m3",
    title: "Operators & User Input",
    summary: "Arithmetic, comparison and logic — and reading input with Scanner.",
    lessons: [
      {
        title: "Arithmetic and assignment operators",
        minutes: 15,
        body: md`### Arithmetic
- «+» add, «-» subtract, «*» multiply, «/» divide, «%» remainder (modulus)
~~~java
int total = 17;
System.out.println(total / 5);  // 3
System.out.println(total % 5);  // 2  → remainder
~~~
«%» is great for checking even/odd: «n % 2 == 0» means even.

### Compound assignment
~~~java
int score = 10;
score += 5;   // score = score + 5 → 15
score *= 2;   // 30
score -= 4;   // 26
~~~

### Increment and decrement
~~~java
int i = 5;
System.out.println(i++); // prints 5, then i becomes 6 (post-increment)
System.out.println(++i); // i becomes 7, then prints 7 (pre-increment)
~~~

> Operator precedence follows maths: «*», «/», «%» before «+» and «-». Use parentheses to make intent clear: «(a + b) * c».`,
      },
      {
        title: "Comparison and logical operators",
        minutes: 15,
        body: md`### Comparison (relational) operators
Return a «boolean»: «==», «!=», «>», «<», «>=», «<=».
~~~java
int marks = 72;
boolean passed = marks >= 40;   // true
~~~

### Logical operators
- «&&» AND — true only if both sides are true
- «||» OR — true if at least one side is true
- «!» NOT — flips true/false
~~~java
boolean eligible = marks >= 60 && attendance >= 75;
boolean holiday = isSunday || isFestival;
boolean absent = !present;
~~~

### Short-circuit evaluation
«&&» stops as soon as the left side is false; «||» stops as soon as the left side is true. This lets you guard risky checks:
~~~java
if (name != null && name.length() > 0) { ... }
~~~

> Never compare Strings with «==». Use «a.equals(b)» — covered in the next module.`,
      },
      {
        title: "Reading input with Scanner",
        minutes: 15,
        body: md`The «Scanner» class reads input typed by the user.

~~~java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = sc.nextLine();

        System.out.print("Enter your age: ");
        int age = sc.nextInt();

        System.out.println("Hi " + name + ", next year you'll be " + (age + 1));
        sc.close();
    }
}
~~~

### Useful methods
- «nextInt()», «nextDouble()», «nextBoolean()» — read a number/boolean
- «next()» — read one word
- «nextLine()» — read the whole line

> **Gotcha:** after «nextInt()», the newline is still in the buffer, so a following «nextLine()» returns an empty string. Call an extra «sc.nextLine();» to consume it.`,
      },
    ],
    quiz: [
      {
        q: "What is «17 % 5»?",
        options: ["3", "2", "3.4", "5"],
        answer: 1,
        explain: "% gives the remainder: 17 = 5×3 + 2.",
      },
      {
        q: "If «int i = 5;», what does «System.out.println(i++);» print?",
        options: ["5", "6", "4", "Compile error"],
        answer: 0,
        explain: "Post-increment returns the old value (5) and then increments i.",
      },
      {
        q: "Which expression is true only when both a and b are true?",
        options: ["a || b", "a && b", "!a", "a != b"],
        answer: 1,
        explain: "&& is logical AND.",
      },
      {
        q: "Which import is needed to use Scanner?",
        options: ["import java.io.Scanner;", "import java.util.Scanner;", "import java.lang.Scanner;", "No import needed"],
        answer: 1,
        explain: "Scanner lives in the java.util package.",
      },
      {
        q: "In «x != null && x.length() > 0», why is x.length() safe?",
        options: [
          "length() never fails",
          "&& short-circuits, so length() runs only if x is not null",
          "Java converts null to an empty string",
          "It is not safe",
        ],
        answer: 1,
        explain: "If the left side is false, && skips the right side, avoiding a NullPointerException.",
      },
    ],
    challenge: {
      title: "Sum and average",
      prompt: md`Use a «Scanner» to read **two integers** from the user, then print their **sum** and their **average** as a decimal (e.g. 7 and 8 → sum 15, average 7.5).`,
      starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

    }
}`,
      rules: [
        { re: /import\s+java\.util\.(Scanner|\*)\s*;/, msg: "Import java.util.Scanner" },
        { re: /new\s+Scanner\s*\(\s*System\.in\s*\)/, msg: "Create a Scanner with new Scanner(System.in)" },
        { re: /nextInt\s*\(\s*\)[\s\S]*nextInt\s*\(\s*\)/, msg: "Read two integers with nextInt()" },
        { re: /\w+\s*\+\s*\w+/, msg: "Add the two numbers with +" },
        { re: /\(\s*double\s*\)|\/\s*2\.0|double\s+\w+\s*=/, msg: "Compute the average as a decimal (cast to double or divide by 2.0)" },
        { re: /System\.out\.println/, msg: "Print the results with System.out.println" },
      ],
      solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int sum = a + b;
        double average = sum / 2.0;
        System.out.println("Sum: " + sum);
        System.out.println("Average: " + average);
        sc.close();
    }
}`,
    },
  },

  {
    id: "m4",
    title: "Making Decisions",
    summary: "if / else, switch and the ternary operator.",
    lessons: [
      {
        title: "if, else if and else",
        minutes: 15,
        body: md`Use «if» to run code only when a condition is true.

~~~java
int marks = 68;

if (marks >= 90) {
    System.out.println("Grade A");
} else if (marks >= 75) {
    System.out.println("Grade B");
} else if (marks >= 50) {
    System.out.println("Grade C");
} else {
    System.out.println("Fail");
}
~~~

Conditions are checked **top to bottom**; only the first true branch runs. Here the output is «Grade C».

### Nested if
~~~java
if (age >= 18) {
    if (hasLicense) {
        System.out.println("You can drive");
    }
}
~~~
Often you can flatten this with «&&»: «if (age >= 18 && hasLicense)».

> Always use braces «{ }», even for one-line blocks. It prevents bugs when you add lines later.`,
      },
      {
        title: "switch statements",
        minutes: 15,
        body: md`«switch» picks one branch based on a value. It works with «int», «char», «String» and enums.

### Classic switch
~~~java
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:
        System.out.println("Another day");
}
~~~
Without «break», execution **falls through** into the next case.

### Arrow switch (Java 14+)
Cleaner, no fall-through, and it can return a value:
~~~java
String type = switch (day) {
    case 6, 7 -> "Weekend";
    default -> "Weekday";
};
~~~`,
      },
      {
        title: "Ternary operator and comparing Strings",
        minutes: 15,
        body: md`### Ternary operator
A compact if/else that produces a value:
~~~java
String result = marks >= 40 ? "Pass" : "Fail";
int max = (a > b) ? a : b;
~~~
Use it for short, simple choices — nested ternaries get hard to read.

### Comparing Strings correctly
«==» checks whether two references point to the **same object**, not whether the text is equal.
~~~java
String a = "java";
String b = new String("java");
System.out.println(a == b);        // false
System.out.println(a.equals(b));   // true
System.out.println("JAVA".equalsIgnoreCase(a)); // true
~~~

> Write «"yes".equals(input)» instead of «input.equals("yes")» — it can't throw a NullPointerException when input is null.`,
      },
    ],
    quiz: [
      {
        q: "marks = 80. Which branch runs?\n«if (marks >= 90) A; else if (marks >= 75) B; else if (marks >= 50) C;»",
        options: ["A", "B", "B and C", "C"],
        answer: 1,
        explain: "Only the first true condition (marks >= 75) runs.",
      },
      {
        q: "What happens if you forget break in a classic switch case?",
        options: ["Compile error", "Execution falls through to the next case", "The switch restarts", "Nothing"],
        answer: 1,
        explain: "Without break, control continues into the following case.",
      },
      {
        q: "What is the value of «int m = (4 > 9) ? 4 : 9;»?",
        options: ["4", "9", "true", "13"],
        answer: 1,
        explain: "4 > 9 is false, so the expression after : is chosen.",
      },
      {
        q: "How should you check if String s contains the text \"admin\"?",
        options: ["s == \"admin\"", "s = \"admin\"", "\"admin\".equals(s)", "s.compare(\"admin\")"],
        answer: 2,
        explain: "Use equals() for content comparison; putting the literal first is null-safe.",
      },
      {
        q: "Which types can a switch work with?",
        options: ["Only int", "int, char, String and enums", "Only boolean", "double and float"],
        answer: 1,
        explain: "switch supports integral types (and wrappers), char, String and enums — not double or boolean.",
      },
    ],
    challenge: {
      title: "Grade calculator",
      prompt: md`Given «int marks = 82;», use **if / else if / else** to print:
- «A» if marks ≥ 90
- «B» if marks ≥ 75
- «C» if marks ≥ 50
- «F» otherwise`,
      starter: `public class Main {
    public static void main(String[] args) {
        int marks = 82;

    }
}`,
      rules: [
        { re: /if\s*\(\s*marks\s*>=\s*90\s*\)/, msg: "Check marks >= 90 first" },
        { re: /else\s+if\s*\(\s*marks\s*>=\s*75\s*\)/, msg: "Use else if (marks >= 75)" },
        { re: /else\s+if\s*\(\s*marks\s*>=\s*50\s*\)/, msg: "Use else if (marks >= 50)" },
        { re: /else\s*\{[^}]*"F"/, msg: 'Finish with an else branch that prints "F"' },
      ],
      solution: `public class Main {
    public static void main(String[] args) {
        int marks = 82;
        if (marks >= 90) {
            System.out.println("A");
        } else if (marks >= 75) {
            System.out.println("B");
        } else if (marks >= 50) {
            System.out.println("C");
        } else {
            System.out.println("F");
        }
    }
}`,
    },
  },

  {
    id: "m5",
    title: "Loops",
    summary: "Repeat work with for, while, do-while, break and continue.",
    lessons: [
      {
        title: "The for loop",
        minutes: 15,
        body: md`A «for» loop repeats code a known number of times.

~~~java
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}
~~~

### The three parts
- **Initialisation** «int i = 1» — runs once at the start.
- **Condition** «i <= 5» — checked before every iteration; the loop stops when it's false.
- **Update** «i++» — runs after every iteration.

### Examples
~~~java
// Sum of 1..100
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}
System.out.println(sum); // 5050

// Count down by 2
for (int i = 10; i > 0; i -= 2) {
    System.out.print(i + " ");  // 10 8 6 4 2
}
~~~

> «i» only exists inside the loop. Using it after the closing brace is a compile error.`,
      },
      {
        title: "while and do-while",
        minutes: 15,
        body: md`### while
Use «while» when you don't know in advance how many times to loop.
~~~java
int n = 1234, digits = 0;
while (n > 0) {
    n = n / 10;
    digits++;
}
System.out.println(digits); // 4
~~~

### do-while
The body runs **at least once** because the condition is checked at the end.
~~~java
Scanner sc = new Scanner(System.in);
int choice;
do {
    System.out.println("1. Start  2. Exit");
    choice = sc.nextInt();
} while (choice != 2);
~~~

> **Infinite loops:** if the condition never becomes false, the loop never ends. Make sure something inside the loop moves it towards stopping.`,
      },
      {
        title: "break, continue and nested loops",
        minutes: 15,
        body: md`### break and continue
~~~java
for (int i = 1; i <= 10; i++) {
    if (i == 7) break;        // leave the loop completely
    if (i % 2 == 0) continue; // skip to the next iteration
    System.out.print(i + " "); // 1 3 5
}
~~~

### Nested loops
A loop inside a loop — the inner loop finishes completely for each outer iteration.
~~~java
for (int row = 1; row <= 4; row++) {
    for (int col = 1; col <= row; col++) {
        System.out.print("* ");
    }
    System.out.println();
}
~~~
Output:
~~~
*
* *
* * *
* * * *
~~~
Pattern programs like this are very common in interviews and lab exams.`,
      },
    ],
    quiz: [
      {
        q: "How many times does «for (int i = 0; i < 5; i++)» run?",
        options: ["4", "5", "6", "Infinite"],
        answer: 1,
        explain: "i takes values 0,1,2,3,4 — five iterations.",
      },
      {
        q: "Which loop always executes its body at least once?",
        options: ["for", "while", "do-while", "enhanced for"],
        answer: 2,
        explain: "do-while checks the condition after running the body.",
      },
      {
        q: "What does continue do?",
        options: ["Exits the loop", "Skips the rest of this iteration and goes to the next", "Restarts the program", "Pauses the loop"],
        answer: 1,
        explain: "continue jumps to the next iteration.",
      },
      {
        q: "What is printed?\n«for (int i = 1; i <= 3; i++) for (int j = 1; j <= 2; j++) count++;» (count starts at 0, then printed)",
        options: ["3", "5", "6", "2"],
        answer: 2,
        explain: "The inner loop runs 2 times for each of 3 outer iterations: 3 × 2 = 6.",
      },
      {
        q: "What does «while (n > 0) { n = n / 10; c++; }» compute for a positive n?",
        options: ["Sum of digits", "Number of digits", "Reverse of n", "n squared"],
        answer: 1,
        explain: "Each division by 10 removes one digit, so c counts the digits.",
      },
    ],
    challenge: {
      title: "Multiplication table",
      prompt: md`Use a **for loop** to print the multiplication table of 7 from 1 to 10 in this format:
~~~
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70
~~~`,
      starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
      rules: [
        { re: /for\s*\(\s*int\s+(\w+)\s*=\s*1\s*;\s*\1\s*<=\s*10\s*;\s*\1\s*(\+\+|\+=\s*1)\s*\)|for\s*\(\s*int\s+(\w+)\s*=\s*1\s*;\s*\3\s*<\s*11\s*;/, msg: "Write a for loop from 1 to 10 (e.g. for (int i = 1; i <= 10; i++))" },
        { re: /7\s*\*\s*\w+|\w+\s*\*\s*7/, msg: "Multiply 7 by the loop variable" },
        { re: /System\.out\.(println|printf)\s*\([^;]*"[^"]*\sx\s[^"]*"[^;]*=/, msg: 'Print each line in the format 7 x i = result (use " x " and " = ")' },
      ],
      solution: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            System.out.println("7 x " + i + " = " + (7 * i));
        }
    }
}`,
    },
  },

  {
    id: "m6",
    title: "Arrays & Strings",
    summary: "Store many values, work with 2D data and manipulate text.",
    lessons: [
      {
        title: "Arrays",
        minutes: 15,
        body: md`An **array** stores a fixed number of values of the same type.

~~~java
int[] marks = {78, 92, 65, 88};
String[] names = new String[3];   // [null, null, null]
names[0] = "Arun";

System.out.println(marks[1]);      // 92  (index starts at 0)
System.out.println(marks.length);  // 4
~~~

### Looping over an array
~~~java
for (int i = 0; i < marks.length; i++) {
    System.out.println(i + ": " + marks[i]);
}

// enhanced for (for-each) — when you don't need the index
for (int m : marks) {
    System.out.println(m);
}
~~~

### Default values
New arrays are filled with defaults: «0» for numbers, «false» for boolean, «null» for objects.

> Accessing «marks[4]» on a 4-element array throws «ArrayIndexOutOfBoundsException». Valid indexes are «0» to «length - 1».`,
      },
      {
        title: "2D arrays and the Arrays class",
        minutes: 15,
        body: md`### 2D arrays
An array of arrays — perfect for grids, matrices and tables.
~~~java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};
System.out.println(matrix[1][2]); // 6

for (int r = 0; r < matrix.length; r++) {
    for (int c = 0; c < matrix[r].length; c++) {
        System.out.print(matrix[r][c] + " ");
    }
    System.out.println();
}
~~~

### java.util.Arrays helpers
~~~java
import java.util.Arrays;

int[] nums = {5, 2, 9, 1};
Arrays.sort(nums);                          // [1, 2, 5, 9]
System.out.println(Arrays.toString(nums));  // prints [1, 2, 5, 9]
int pos = Arrays.binarySearch(nums, 5);     // 2 (array must be sorted)
int[] copy = Arrays.copyOf(nums, 6);        // [1, 2, 5, 9, 0, 0]
~~~
> Printing an array directly («System.out.println(nums)») shows something like «[I@1b6d3586». Use «Arrays.toString».`,
      },
      {
        title: "String methods and StringBuilder",
        minutes: 15,
        body: md`### Common String methods
~~~java
String s = "  Journify Java  ";
s.trim();                 // "Journify Java"
s.toUpperCase();          // "  JOURNIFY JAVA  "
"java".charAt(0);         // 'j'
"java".indexOf('v');      // 2
"Hello World".substring(6);      // "World"
"Hello World".substring(0, 5);   // "Hello"
"a,b,c".split(",");              // ["a", "b", "c"]
"banana".replace('a', 'o');      // "bonono"
"Java".contains("av");           // true
~~~

### Strings are immutable
Methods never change the original — they return a **new** String:
~~~java
String name = "java";
name.toUpperCase();          // result discarded!
name = name.toUpperCase();   // now name is "JAVA"
~~~

### StringBuilder
Building a string in a loop with «+» creates many objects. Use «StringBuilder»:
~~~java
StringBuilder sb = new StringBuilder();
for (int i = 1; i <= 5; i++) {
    sb.append(i).append(" ");
}
System.out.println(sb.toString());       // 1 2 3 4 5
System.out.println(new StringBuilder("java").reverse()); // avaj
~~~`,
      },
    ],
    quiz: [
      {
        q: "What is the index of the last element in an array of length 10?",
        options: ["10", "9", "11", "0"],
        answer: 1,
        explain: "Indexes run from 0 to length − 1.",
      },
      {
        q: "What is the default value of elements in «new int[5]»?",
        options: ["null", "0", "undefined", "-1"],
        answer: 1,
        explain: "Numeric array elements default to 0.",
      },
      {
        q: "What does «\"Hello World\".substring(0, 5)» return?",
        options: ["\"Hello \"", "\"Hello\"", "\"World\"", "\"ello\""],
        answer: 1,
        explain: "substring(start, end) includes start and excludes end: characters 0–4.",
      },
      {
        q: "After «String s = \"hi\"; s.toUpperCase();», what is s?",
        options: ["\"HI\"", "\"hi\"", "null", "Compile error"],
        answer: 1,
        explain: "Strings are immutable; the uppercase result was not assigned back.",
      },
      {
        q: "Which is the best choice for building a long string inside a loop?",
        options: ["String with +", "StringBuilder", "char[] only", "Arrays.toString"],
        answer: 1,
        explain: "StringBuilder appends efficiently without creating a new String each time.",
      },
    ],
    challenge: {
      title: "Find the maximum",
      prompt: md`Given «int[] nums = {12, 45, 7, 89, 23};», write a loop that finds the **largest** number without using «Arrays.sort», and print it. Expected output: «89».`,
      starter: `public class Main {
    public static void main(String[] args) {
        int[] nums = {12, 45, 7, 89, 23};

    }
}`,
      rules: [
        { re: /int\s+max\s*=\s*(nums\s*\[\s*0\s*\]|Integer\.MIN_VALUE)\s*;/, msg: "Start with int max = nums[0]; (or Integer.MIN_VALUE)" },
        { re: /for\s*\(/, msg: "Loop through the array with a for or for-each loop" },
        { re: /if\s*\(\s*(\w+(\s*\[\s*\w+\s*\])?)\s*>\s*max\s*\)|if\s*\(\s*max\s*<\s*\w+/, msg: "Compare each element with max using if (... > max)" },
        { re: /max\s*=\s*\w+/, msg: "Update max when you find a larger value" },
        { re: /System\.out\.println\s*\([^;]*max/, msg: "Print max" },
      ],
      forbid: [{ re: /Arrays\.sort/, msg: "Don't use Arrays.sort — find the max with a loop" }],
      solution: `public class Main {
    public static void main(String[] args) {
        int[] nums = {12, 45, 7, 89, 23};
        int max = nums[0];
        for (int n : nums) {
            if (n > max) {
                max = n;
            }
        }
        System.out.println(max);
    }
}`,
    },
  },
];
