// Java course, modules 7–12. Same lesson markdown as java-part1.js.
const md = String.raw;

export const MODULES_2 = [
  {
    id: "m7",
    title: "Methods",
    summary: "Organise code into reusable methods, overloading and recursion.",
    lessons: [
      {
        title: "Defining and calling methods",
        minutes: 15,
        body: md`A **method** is a named block of code that performs a task. Methods make code reusable and easier to read.

~~~java
public class Main {
    static int square(int n) {
        return n * n;
    }

    static void greet(String name) {
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) {
        int result = square(6);      // 36
        greet("Kavin");
    }
}
~~~

### Anatomy of a method
~~~
static  int   square ( int n )  { return n * n; }
  │      │      │         │
modifier return name   parameters
         type
~~~
- «void» means the method returns nothing.
- A non-void method **must** return a value of its declared type on every path.
- «static» methods belong to the class and can be called from «main» directly. You'll meet non-static (instance) methods in the OOP module.`,
      },
      {
        title: "Parameters, pass-by-value and overloading",
        minutes: 15,
        body: md`### Java is always pass-by-value
A method receives a **copy** of each argument.
~~~java
static void change(int x) { x = 100; }

int a = 5;
change(a);
System.out.println(a); // still 5
~~~
For objects and arrays, the *reference* is copied — so the method can modify the object's contents, but can't make the caller's variable point to a different object.
~~~java
static void fill(int[] arr) { arr[0] = 99; }
int[] data = {1, 2};
fill(data);   // data[0] is now 99
~~~

### Method overloading
Several methods can share a name if their **parameter lists differ**:
~~~java
static int add(int a, int b) { return a + b; }
static double add(double a, double b) { return a + b; }
static int add(int a, int b, int c) { return a + b + c; }
~~~
The compiler picks the right one from the arguments. Changing only the return type is **not** overloading.

### Varargs
~~~java
static int sum(int... nums) {
    int total = 0;
    for (int n : nums) total += n;
    return total;
}
sum(1, 2, 3, 4); // 10
~~~`,
      },
      {
        title: "Recursion",
        minutes: 15,
        body: md`A **recursive** method calls itself to solve a smaller version of the same problem.

~~~java
static int factorial(int n) {
    if (n <= 1) {          // base case — stops the recursion
        return 1;
    }
    return n * factorial(n - 1);  // recursive case
}
// factorial(4) = 4 * 3 * 2 * 1 = 24
~~~

### Every recursion needs
- A **base case** that returns without recursing.
- A **recursive case** that moves closer to the base case.

Missing the base case causes a «StackOverflowError».

### Fibonacci
~~~java
static int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}
~~~
> This simple Fibonacci recomputes the same values many times (exponential time). For large «n», use a loop or store results (memoisation).`,
      },
    ],
    quiz: [
      {
        q: "What does a method with return type void return?",
        options: ["0", "null", "Nothing", "An empty String"],
        answer: 2,
        explain: "void methods do not return a value.",
      },
      {
        q: "After «static void inc(int x) { x++; }» and «int a = 3; inc(a);», what is a?",
        options: ["4", "3", "0", "Compile error"],
        answer: 1,
        explain: "Primitives are passed by value; the method changes only its own copy.",
      },
      {
        q: "Which pair is valid method overloading?",
        options: [
          "int f(int a) and double f(int a)",
          "int f(int a) and int f(int a, int b)",
          "int f(int a) and int f(int b)",
          "void f() and int f()",
        ],
        answer: 1,
        explain: "Overloads must differ in parameter list; return type or parameter names alone don't count.",
      },
      {
        q: "What error occurs when recursion never reaches a base case?",
        options: ["NullPointerException", "OutOfMemoryError only on Linux", "StackOverflowError", "ArithmeticException"],
        answer: 2,
        explain: "Each call adds a stack frame until the call stack overflows.",
      },
      {
        q: "What is factorial(5) using «return n <= 1 ? 1 : n * factorial(n - 1);»?",
        options: ["15", "120", "24", "720"],
        answer: 1,
        explain: "5 × 4 × 3 × 2 × 1 = 120.",
      },
    ],
    challenge: {
      title: "Recursive factorial",
      prompt: md`Write a **recursive** static method «factorial» that takes an «int n» and returns «n!» as a «long». Include a base case. Call it from «main» and print «factorial(10)» (expected «3628800»).`,
      starter: `public class Main {
    // write your factorial method here

    public static void main(String[] args) {

    }
}`,
      rules: [
        { re: /static\s+(long|int)\s+factorial\s*\(\s*int\s+(\w+)\s*\)/, msg: "Declare static long factorial(int n)" },
        { re: /if\s*\(\s*\w+\s*(<=\s*1|==\s*0|==\s*1|<\s*2)\s*\)|\w+\s*(<=\s*1|==\s*0|<\s*2)\s*\?/, msg: "Add a base case such as if (n <= 1) return 1;" },
        { re: /return\s+\w+\s*\*\s*factorial\s*\(\s*\w+\s*-\s*1\s*\)|factorial\s*\(\s*\w+\s*-\s*1\s*\)\s*\*\s*\w+/, msg: "Recursive case: return n * factorial(n - 1);" },
        { re: /System\.out\.println\s*\(\s*factorial\s*\(\s*10\s*\)\s*\)/, msg: "Print factorial(10) from main" },
      ],
      forbid: [{ re: /\bfor\s*\(|\bwhile\s*\(/, msg: "Use recursion, not a loop" }],
      solution: `public class Main {
    static long factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(10));
    }
}`,
    },
  },

  {
    id: "m8",
    title: "Object-Oriented Programming: Classes & Objects",
    summary: "Model real things with classes, constructors, encapsulation and static.",
    lessons: [
      {
        title: "Classes and objects",
        minutes: 15,
        body: md`A **class** is a blueprint; an **object** is a thing built from that blueprint.

~~~java
class Car {
    String brand;     // fields (state)
    int speed;

    void accelerate(int amount) {   // method (behaviour)
        speed += amount;
    }
}

public class Main {
    public static void main(String[] args) {
        Car c1 = new Car();     // create an object with new
        c1.brand = "Tata";
        c1.accelerate(40);

        Car c2 = new Car();
        c2.brand = "Mahindra";

        System.out.println(c1.brand + " " + c1.speed); // Tata 40
        System.out.println(c2.brand + " " + c2.speed); // Mahindra 0
    }
}
~~~
Each object has its **own copy** of the fields.

### The four pillars of OOP
- **Encapsulation** — hide data, expose behaviour.
- **Inheritance** — reuse and extend existing classes.
- **Polymorphism** — one interface, many forms.
- **Abstraction** — show what something does, hide how.`,
      },
      {
        title: "Constructors and this",
        minutes: 15,
        body: md`A **constructor** initialises a new object. It has the same name as the class and no return type.

~~~java
class Student {
    String name;
    int rollNo;

    Student(String name, int rollNo) {
        this.name = name;      // this.name is the field, name is the parameter
        this.rollNo = rollNo;
    }

    Student(String name) {
        this(name, 0);         // call another constructor
    }
}

Student s = new Student("Divya", 21);
~~~

### Key points
- If you write **no** constructor, Java provides a default no-argument one.
- Once you write any constructor, the default one is **not** generated.
- «this» refers to the current object. Use it to tell a field apart from a parameter with the same name.
- «this(...)» calls another constructor of the same class and must be the first statement.`,
      },
      {
        title: "Encapsulation and static members",
        minutes: 15,
        body: md`### Encapsulation
Make fields «private» and control access with public **getters and setters**. This lets you validate data.

~~~java
class BankAccount {
    private double balance;

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        balance += amount;
    }
}
~~~
Code outside the class can't write «account.balance = -500;» — it must go through «deposit».

### Access modifiers
- «private» — only inside the class
- *(no modifier)* — inside the same package
- «protected» — same package + subclasses
- «public» — everywhere

### static
A «static» field or method belongs to the **class**, shared by all objects.
~~~java
class Student {
    static int count = 0;
    Student() { count++; }
}
new Student(); new Student();
System.out.println(Student.count); // 2
~~~
Static methods can't use «this» or access instance fields directly.`,
      },
    ],
    quiz: [
      {
        q: "Which keyword creates a new object?",
        options: ["class", "new", "this", "static"],
        answer: 1,
        explain: "new allocates an object and calls its constructor.",
      },
      {
        q: "What is true about a constructor?",
        options: [
          "It must return void",
          "It has the same name as the class and no return type",
          "It must be static",
          "A class can have only one",
        ],
        answer: 1,
        explain: "Constructors share the class name and have no return type; they can be overloaded.",
      },
      {
        q: "Inside a constructor, what does «this.name = name;» do?",
        options: [
          "Assigns the parameter to the field",
          "Assigns the field to the parameter",
          "Creates a new object",
          "Nothing — it's a compile error",
        ],
        answer: 0,
        explain: "this.name is the object's field; the right-hand name is the parameter.",
      },
      {
        q: "Which access modifier makes a field visible only inside its own class?",
        options: ["public", "protected", "private", "default"],
        answer: 2,
        explain: "private restricts access to the declaring class.",
      },
      {
        q: "A static field is…",
        options: ["Copied into each object", "Shared by all objects of the class", "Always final", "Only usable in main"],
        answer: 1,
        explain: "static members belong to the class, so there's one shared copy.",
      },
    ],
    challenge: {
      title: "Encapsulated Student class",
      prompt: md`Create a class «Student» with:
- «private» fields «name» (String) and «marks» (int)
- a constructor that takes both and assigns them using «this»
- public getters «getName()» and «getMarks()»

In «main», create a Student and print their name and marks using the getters.`,
      starter: `class Student {
    // fields, constructor and getters

}

public class Main {
    public static void main(String[] args) {

    }
}`,
      rules: [
        { re: /private\s+String\s+name\s*;/, msg: "Add a private String name field" },
        { re: /private\s+int\s+marks\s*;/, msg: "Add a private int marks field" },
        { re: /Student\s*\(\s*String\s+\w+\s*,\s*int\s+\w+\s*\)/, msg: "Write a constructor Student(String name, int marks)" },
        { re: /this\.name\s*=\s*\w+\s*;[\s\S]*this\.marks\s*=|this\.marks\s*=\s*\w+\s*;[\s\S]*this\.name\s*=/, msg: "Assign both fields using this.name and this.marks" },
        { re: /public\s+String\s+getName\s*\(\s*\)\s*\{\s*return\s+(this\.)?name\s*;/, msg: "Add public String getName() that returns name" },
        { re: /public\s+int\s+getMarks\s*\(\s*\)\s*\{\s*return\s+(this\.)?marks\s*;/, msg: "Add public int getMarks() that returns marks" },
        { re: /new\s+Student\s*\(/, msg: "Create a Student object in main" },
        { re: /\.getName\s*\(\s*\)[\s\S]*\.getMarks\s*\(\s*\)|\.getMarks\s*\(\s*\)[\s\S]*\.getName\s*\(\s*\)/, msg: "Print using getName() and getMarks()" },
      ],
      solution: `class Student {
    private String name;
    private int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    public String getName() {
        return name;
    }

    public int getMarks() {
        return marks;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Divya", 91);
        System.out.println(s.getName() + " scored " + s.getMarks());
    }
}`,
    },
  },

  {
    id: "m9",
    title: "Inheritance, Polymorphism & Interfaces",
    summary: "Reuse code with extends, override behaviour and design with abstractions.",
    lessons: [
      {
        title: "Inheritance and super",
        minutes: 15,
        body: md`**Inheritance** lets a class (subclass) reuse and extend another class (superclass) using «extends».

~~~java
class Employee {
    protected String name;
    protected double salary;

    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    void describe() {
        System.out.println(name + " earns " + salary);
    }
}

class Manager extends Employee {
    private int teamSize;

    Manager(String name, double salary, int teamSize) {
        super(name, salary);   // call the parent constructor first
        this.teamSize = teamSize;
    }
}
~~~
«Manager» automatically has «name», «salary» and «describe()».

### Rules
- Java supports **single inheritance** of classes: a class can extend only one class.
- «super(...)» calls the parent constructor and must be the first statement.
- «super.method()» calls the parent's version of a method.
- Every class ultimately extends «java.lang.Object».`,
      },
      {
        title: "Method overriding and polymorphism",
        minutes: 15,
        body: md`A subclass can **override** a method to change its behaviour.

~~~java
class Animal {
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Woof"); }
}
class Cat extends Animal {
    @Override
    void sound() { System.out.println("Meow"); }
}
~~~

### Polymorphism
A parent-type variable can hold any child object. The method that runs is decided **at runtime** by the actual object:
~~~java
Animal[] animals = { new Dog(), new Cat(), new Animal() };
for (Animal a : animals) {
    a.sound();   // Woof, Meow, Some sound
}
~~~

### Overloading vs overriding
- **Overloading** — same name, different parameters, same class. Decided at compile time.
- **Overriding** — same signature in a subclass. Decided at runtime.

> Always add «@Override». The compiler will then catch typos like «void sond()».`,
      },
      {
        title: "Abstract classes and interfaces",
        minutes: 15,
        body: md`### Abstract classes
An «abstract» class can't be instantiated. It can mix implemented methods with **abstract** methods that subclasses must implement.
~~~java
abstract class Shape {
    abstract double area();
    void print() { System.out.println("Area: " + area()); }
}
class Square extends Shape {
    double side;
    Square(double side) { this.side = side; }
    @Override
    double area() { return side * side; }
}
~~~

### Interfaces
An «interface» is a contract: a list of methods a class promises to provide. A class can implement **many** interfaces.
~~~java
interface Payable {
    double calculatePay();
}
interface Printable {
    void print();
}
class Intern implements Payable, Printable {
    public double calculatePay() { return 15000; }
    public void print() { System.out.println("Intern pay: " + calculatePay()); }
}
~~~
Since Java 8, interfaces can also have «default» and «static» methods with bodies.

> Use an **interface** to describe a capability ("can be paid"). Use an **abstract class** when related classes share code and state.`,
      },
    ],
    quiz: [
      {
        q: "Which keyword makes a class inherit from another class?",
        options: ["implements", "extends", "inherits", "super"],
        answer: 1,
        explain: "Classes use extends; interfaces are implemented with implements.",
      },
      {
        q: "How many classes can a Java class directly extend?",
        options: ["One", "Two", "Unlimited", "None"],
        answer: 0,
        explain: "Java has single inheritance for classes (but a class can implement many interfaces).",
      },
      {
        q: "«Animal a = new Dog(); a.sound();» — Dog overrides sound(). Which version runs?",
        options: ["Animal's", "Dog's", "Both", "Compile error"],
        answer: 1,
        explain: "Overridden methods are chosen at runtime by the actual object type (Dog).",
      },
      {
        q: "Which statement about abstract classes is true?",
        options: [
          "They can be instantiated with new",
          "They cannot have constructors",
          "They cannot be instantiated directly",
          "All their methods must be abstract",
        ],
        answer: 2,
        explain: "Abstract classes can't be created with new, but can have constructors and concrete methods.",
      },
      {
        q: "What does the @Override annotation do?",
        options: [
          "Makes a method faster",
          "Asks the compiler to verify the method really overrides a parent method",
          "Makes a method static",
          "Hides the parent method",
        ],
        answer: 1,
        explain: "It causes a compile error if the method doesn't actually override anything.",
      },
    ],
    challenge: {
      title: "Shapes with an interface",
      prompt: md`Create:
- an interface «Shape» with a method «double area();»
- a class «Circle» that **implements** Shape, has a «radius» field set by its constructor, and returns «Math.PI * radius * radius» from «area()»

In «main», create «Shape s = new Circle(2);» and print «s.area()».`,
      starter: `interface Shape {

}

class Circle implements Shape {

}

public class Main {
    public static void main(String[] args) {

    }
}`,
      rules: [
        { re: /interface\s+Shape\s*\{[^}]*double\s+area\s*\(\s*\)\s*;/, msg: "Declare double area(); inside interface Shape" },
        { re: /class\s+Circle\s+implements\s+Shape/, msg: "Make Circle implement Shape" },
        { re: /double\s+radius\s*;/, msg: "Give Circle a double radius field" },
        { re: /Circle\s*\(\s*double\s+\w+\s*\)/, msg: "Add a constructor Circle(double radius)" },
        { re: /public\s+double\s+area\s*\(\s*\)\s*\{[^}]*Math\.PI\s*\*\s*(this\.)?radius\s*\*\s*(this\.)?radius|public\s+double\s+area\s*\(\s*\)\s*\{[^}]*Math\.PI\s*\*\s*Math\.pow\s*\(\s*(this\.)?radius\s*,\s*2\s*\)/, msg: "Implement public double area() returning Math.PI * radius * radius" },
        { re: /Shape\s+\w+\s*=\s*new\s+Circle\s*\(/, msg: "Create the object as Shape s = new Circle(2);" },
        { re: /System\.out\.println\s*\(\s*\w+\.area\s*\(\s*\)\s*\)/, msg: "Print s.area()" },
      ],
      solution: `interface Shape {
    double area();
}

class Circle implements Shape {
    double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Circle(2);
        System.out.println(s.area());
    }
}`,
    },
  },

  {
    id: "m10",
    title: "Exception Handling & File I/O",
    summary: "Handle errors gracefully and read/write files safely.",
    lessons: [
      {
        title: "try, catch and finally",
        minutes: 15,
        body: md`An **exception** is an error event that interrupts normal flow. Without handling, the program crashes with a stack trace.

~~~java
try {
    int[] arr = new int[3];
    arr[5] = 10;                         // throws
    System.out.println("Not printed");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Invalid index: " + e.getMessage());
} finally {
    System.out.println("Always runs");
}
~~~

### Multiple catch blocks
~~~java
try {
    int n = Integer.parseInt(input);
    System.out.println(100 / n);
} catch (NumberFormatException e) {
    System.out.println("Not a number");
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}
~~~
Catch **specific** exceptions before general ones like «Exception».

### Common runtime exceptions
- «NullPointerException» — calling a method on «null»
- «ArithmeticException» — integer division by zero
- «ArrayIndexOutOfBoundsException»
- «NumberFormatException» — bad number string
- «ClassCastException» — invalid cast`,
      },
      {
        title: "throw, throws and custom exceptions",
        minutes: 15,
        body: md`### Checked vs unchecked
- **Checked** exceptions (e.g. «IOException») must be caught or declared with «throws». The compiler enforces this.
- **Unchecked** exceptions extend «RuntimeException» (e.g. «NullPointerException») — handling is optional.

### throw and throws
~~~java
static void withdraw(double amount, double balance) throws InsufficientFundsException {
    if (amount > balance) {
        throw new InsufficientFundsException("Balance too low");
    }
}
~~~
- «throw» — actually raises an exception.
- «throws» — in a method signature, warns callers it may raise a checked exception.

### Custom exception
~~~java
class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) {
        super(message);
    }
}
~~~
Extend «Exception» for a checked exception or «RuntimeException» for unchecked.

> Never write an empty «catch {}» — at least log the error, or you'll hide bugs.`,
      },
      {
        title: "Reading and writing files",
        minutes: 15,
        body: md`### try-with-resources
Resources like files must be closed. try-with-resources closes them automatically, even if an exception occurs.

~~~java
import java.io.*;

try (BufferedWriter writer = new BufferedWriter(new FileWriter("notes.txt"))) {
    writer.write("Learning Java at Journify");
    writer.newLine();
} catch (IOException e) {
    System.out.println("Could not write: " + e.getMessage());
}

try (BufferedReader reader = new BufferedReader(new FileReader("notes.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.out.println("Could not read: " + e.getMessage());
}
~~~

### Modern shortcut: java.nio.file.Files
~~~java
import java.nio.file.*;
import java.util.List;

Path path = Path.of("notes.txt");
Files.writeString(path, "Hello file!");
List<String> lines = Files.readAllLines(path);
~~~
> File operations throw «IOException» (a checked exception), so you must catch it or declare «throws IOException».`,
      },
    ],
    quiz: [
      {
        q: "When does a finally block run?",
        options: ["Only when an exception occurs", "Only when no exception occurs", "Always, whether or not an exception occurs", "Never"],
        answer: 2,
        explain: "finally runs after try/catch in all normal cases — ideal for cleanup.",
      },
      {
        q: "Which exception does «int x = 10 / 0;» throw?",
        options: ["NullPointerException", "ArithmeticException", "NumberFormatException", "IOException"],
        answer: 1,
        explain: "Integer division by zero throws ArithmeticException.",
      },
      {
        q: "Which is a checked exception?",
        options: ["NullPointerException", "ArithmeticException", "IOException", "ArrayIndexOutOfBoundsException"],
        answer: 2,
        explain: "IOException must be caught or declared; the others are RuntimeExceptions.",
      },
      {
        q: "What is the difference between throw and throws?",
        options: [
          "No difference",
          "throw raises an exception; throws declares that a method may raise one",
          "throws raises an exception; throw declares it",
          "throw is only for custom exceptions",
        ],
        answer: 1,
        explain: "throw is a statement that raises; throws is part of the method signature.",
      },
      {
        q: "What is the main benefit of try-with-resources?",
        options: ["Faster file reading", "Resources are closed automatically", "No exceptions can occur", "It replaces catch"],
        answer: 1,
        explain: "Any AutoCloseable declared in the try header is closed automatically.",
      },
    ],
    challenge: {
      title: "Safe division",
      prompt: md`Write a static method «safeDivide(int a, int b)» that returns «a / b». Inside it, use **try / catch** to catch «ArithmeticException»: print «Cannot divide by zero» and return «0». In «main», call «safeDivide(10, 0)» and print the result.`,
      starter: `public class Main {
    // write safeDivide here

    public static void main(String[] args) {

    }
}`,
      rules: [
        { re: /static\s+int\s+safeDivide\s*\(\s*int\s+\w+\s*,\s*int\s+\w+\s*\)/, msg: "Declare static int safeDivide(int a, int b)" },
        { re: /try\s*\{[^}]*\/[^}]*\}/, msg: "Do the division inside a try block" },
        { re: /catch\s*\(\s*ArithmeticException\s+\w+\s*\)/, msg: "Catch ArithmeticException" },
        { re: /"Cannot divide by zero"/, msg: 'Print "Cannot divide by zero" in the catch block' },
        { re: /return\s+0\s*;/, msg: "Return 0 when division fails" },
        { re: /safeDivide\s*\(\s*10\s*,\s*0\s*\)/, msg: "Call safeDivide(10, 0) from main" },
      ],
      solution: `public class Main {
    static int safeDivide(int a, int b) {
        try {
            return a / b;
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
            return 0;
        }
    }

    public static void main(String[] args) {
        System.out.println(safeDivide(10, 0));
    }
}`,
    },
  },

  {
    id: "m11",
    title: "Collections & Generics",
    summary: "ArrayList, HashMap, HashSet, generics and sorting.",
    lessons: [
      {
        title: "ArrayList",
        minutes: 15,
        body: md`Arrays have a fixed size. An «ArrayList» grows and shrinks automatically.

~~~java
import java.util.ArrayList;
import java.util.List;

List<String> courses = new ArrayList<>();
courses.add("Java");
courses.add("Python");
courses.add(1, "SQL");          // insert at index 1

System.out.println(courses);           // [Java, SQL, Python]
System.out.println(courses.get(0));    // Java
System.out.println(courses.size());    // 3
courses.remove("SQL");
System.out.println(courses.contains("Python")); // true

for (String c : courses) {
    System.out.println(c);
}
~~~

### Wrapper classes
Collections store **objects**, not primitives. Use wrapper types: «Integer», «Double», «Character», «Boolean».
~~~java
List<Integer> marks = new ArrayList<>();
marks.add(90);          // autoboxing int → Integer
int first = marks.get(0); // unboxing Integer → int
~~~
> Declare variables by interface («List<String>») and create with the implementation («new ArrayList<>()»). It keeps your code flexible.`,
      },
      {
        title: "HashMap and HashSet",
        minutes: 15,
        body: md`### HashMap — key → value pairs
~~~java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> stock = new HashMap<>();
stock.put("pen", 40);
stock.put("book", 15);
stock.put("pen", 35);                // replaces the old value

System.out.println(stock.get("pen"));            // 35
System.out.println(stock.getOrDefault("bag", 0)); // 0
System.out.println(stock.containsKey("book"));    // true

for (Map.Entry<String, Integer> e : stock.entrySet()) {
    System.out.println(e.getKey() + " = " + e.getValue());
}
~~~
Keys are unique. HashMap gives very fast lookups (average O(1)) but **no guaranteed order**. Use «LinkedHashMap» to keep insertion order or «TreeMap» for sorted keys.

### HashSet — unique values
~~~java
import java.util.HashSet;
import java.util.Set;

Set<String> emails = new HashSet<>();
emails.add("a@x.com");
emails.add("a@x.com");      // ignored — duplicate
System.out.println(emails.size()); // 1
~~~`,
      },
      {
        title: "Generics, sorting and Comparator",
        minutes: 15,
        body: md`### Generics
The «<T>» in «List<T>» is a **type parameter**. It makes collections type-safe — the compiler stops you adding the wrong type, and you don't need casts.

You can write your own generic classes and methods:
~~~java
class Box<T> {
    private T value;
    Box(T value) { this.value = value; }
    T get() { return value; }
}
Box<String> b = new Box<>("Java");
String s = b.get();   // no cast needed

static <T> void printAll(List<T> items) {
    for (T item : items) System.out.println(item);
}
~~~

### Sorting
~~~java
import java.util.*;

List<Integer> nums = new ArrayList<>(List.of(5, 2, 8, 1));
Collections.sort(nums);                 // [1, 2, 5, 8]
nums.sort(Comparator.reverseOrder());   // [8, 5, 2, 1]

List<String> names = new ArrayList<>(List.of("Ravi", "Anu", "Karthik"));
names.sort(Comparator.comparing(String::length)); // [Anu, Ravi, Karthik]
~~~
> «List.of(...)» creates an **immutable** list. Wrap it in «new ArrayList<>(...)» if you need to modify it.`,
      },
    ],
    quiz: [
      {
        q: "What is the main advantage of ArrayList over an array?",
        options: ["It's always faster", "It can grow and shrink dynamically", "It stores primitives directly", "It's sorted automatically"],
        answer: 1,
        explain: "ArrayList resizes automatically as you add or remove elements.",
      },
      {
        q: "Which type should you use for «List<?> marks» holding whole numbers?",
        options: ["List<int>", "List<Integer>", "List<Number[]>", "List<long>"],
        answer: 1,
        explain: "Generics require object types, so use the wrapper Integer.",
      },
      {
        q: "What happens when you put a key that already exists into a HashMap?",
        options: ["An exception is thrown", "The old value is replaced", "A duplicate key is created", "Nothing"],
        answer: 1,
        explain: "Keys are unique; put() overwrites the existing value.",
      },
      {
        q: "Which collection automatically ignores duplicate elements?",
        options: ["ArrayList", "HashSet", "LinkedList", "Array"],
        answer: 1,
        explain: "A Set holds only unique elements.",
      },
      {
        q: "What does «map.getOrDefault(\"x\", 0)» return if \"x\" is not a key?",
        options: ["null", "0", "Throws an exception", "\"x\""],
        answer: 1,
        explain: "It returns the supplied default when the key is missing.",
      },
    ],
    challenge: {
      title: "Word frequency counter",
      prompt: md`Given «String text = "java is fun and java is powerful";», split it into words and use a «HashMap<String, Integer>» to count how many times each word appears. Print the map. («java» and «is» should each have count 2.)`,
      starter: `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String text = "java is fun and java is powerful";

    }
}`,
      rules: [
        { re: /(Map|HashMap)\s*<\s*String\s*,\s*Integer\s*>\s+\w+\s*=\s*new\s+HashMap\s*<\s*(String\s*,\s*Integer)?\s*>\s*\(\s*\)/, msg: "Create a Map<String, Integer> with new HashMap<>()" },
        { re: /\.split\s*\(\s*"(\s|\\\\s\+?)"\s*\)/, msg: 'Split the text into words with text.split(" ")' },
        { re: /for\s*\(\s*String\s+\w+\s*:/, msg: "Loop over the words with a for-each loop" },
        { re: /getOrDefault\s*\(\s*\w+\s*,\s*0\s*\)\s*\+\s*1|merge\s*\(\s*\w+\s*,\s*1\s*,\s*Integer::sum\s*\)|containsKey\s*\(/, msg: "Increase the count with getOrDefault(word, 0) + 1 (or merge / containsKey)" },
        { re: /\.put\s*\(|\.merge\s*\(/, msg: "Store the updated count with put()" },
        { re: /System\.out\.println\s*\(\s*\w+\s*\)/, msg: "Print the map" },
      ],
      solution: `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String text = "java is fun and java is powerful";
        Map<String, Integer> counts = new HashMap<>();
        for (String word : text.split(" ")) {
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }
        System.out.println(counts);
    }
}`,
    },
  },

  {
    id: "m12",
    title: "Modern Java: Lambdas, Streams & Concurrency",
    summary: "Functional-style Java, the Streams API, records and threads.",
    lessons: [
      {
        title: "Lambdas and functional interfaces",
        minutes: 15,
        body: md`A **lambda** is a short anonymous function. It works wherever Java expects a **functional interface** — an interface with exactly one abstract method.

~~~java
// Before Java 8
Comparator<String> byLength = new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
};

// With a lambda
Comparator<String> byLength2 = (a, b) -> a.length() - b.length();
~~~

### Built-in functional interfaces (java.util.function)
- «Predicate<T>» — «T → boolean», e.g. «n -> n > 0»
- «Function<T, R>» — «T → R», e.g. «s -> s.length()»
- «Consumer<T>» — «T → void», e.g. «s -> System.out.println(s)»
- «Supplier<T>» — «() → T», e.g. «() -> new ArrayList<>()»

~~~java
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4)); // true

List<String> names = List.of("Ram", "Sita");
names.forEach(n -> System.out.println(n));
names.forEach(System.out::println);   // method reference
~~~`,
      },
      {
        title: "The Streams API",
        minutes: 15,
        body: md`A **stream** processes a sequence of elements through a pipeline: **source → intermediate operations → terminal operation**.

~~~java
import java.util.*;
import java.util.stream.*;

List<Integer> marks = List.of(45, 82, 67, 91, 38, 74);

List<Integer> passed = marks.stream()
        .filter(m -> m >= 50)        // keep 82, 67, 91, 74
        .sorted()                    // 67, 74, 82, 91
        .collect(Collectors.toList());

double avg = marks.stream()
        .mapToInt(Integer::intValue)
        .average()
        .orElse(0);

long count = marks.stream().filter(m -> m > 80).count();  // 2
~~~

### Common operations
- Intermediate (lazy): «filter», «map», «sorted», «distinct», «limit»
- Terminal (trigger execution): «collect», «forEach», «count», «reduce», «sum», «anyMatch»

~~~java
List<String> upper = List.of("java", "spring").stream()
        .map(String::toUpperCase)
        .toList();                   // Java 16+: [JAVA, SPRING]
~~~
> Streams don't modify the original collection, and a stream can only be consumed **once**.`,
      },
      {
        title: "Records and multithreading basics",
        minutes: 15,
        body: md`### Records (Java 16+)
A compact way to declare immutable data classes. Java generates the constructor, getters, «equals», «hashCode» and «toString».
~~~java
record Student(String name, int marks) {}

Student s = new Student("Asha", 88);
System.out.println(s.name());   // Asha
System.out.println(s);          // Student[name=Asha, marks=88]
~~~

### Threads
A **thread** is an independent path of execution, letting your program do several things at once.
~~~java
Runnable task = () -> {
    for (int i = 1; i <= 3; i++) {
        System.out.println(Thread.currentThread().getName() + ": " + i);
    }
};
Thread t1 = new Thread(task, "Worker-1");
Thread t2 = new Thread(task, "Worker-2");
t1.start();
t2.start();   // output from both threads interleaves
~~~

### Synchronisation and executors
When threads share data, protect it with «synchronized» to avoid race conditions:
~~~java
class Counter {
    private int count = 0;
    synchronized void increment() { count++; }
}
~~~
In real applications, prefer an «ExecutorService» thread pool over creating threads manually:
~~~java
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(task);
pool.shutdown();
~~~`,
      },
    ],
    quiz: [
      {
        q: "A functional interface has…",
        options: ["No methods", "Exactly one abstract method", "Only static methods", "At least two abstract methods"],
        answer: 1,
        explain: "Lambdas can implement interfaces that have a single abstract method.",
      },
      {
        q: "Which functional interface represents a condition that returns true/false?",
        options: ["Supplier", "Consumer", "Predicate", "Function"],
        answer: 2,
        explain: "Predicate<T> has boolean test(T t).",
      },
      {
        q: "Which stream operation is terminal?",
        options: ["filter", "map", "sorted", "collect"],
        answer: 3,
        explain: "collect triggers the pipeline; filter, map and sorted are lazy intermediate operations.",
      },
      {
        q: "What does «List.of(1,2,3,4).stream().map(n -> n * n).toList()» produce?",
        options: ["[1, 2, 3, 4]", "[1, 4, 9, 16]", "[2, 4, 6, 8]", "16"],
        answer: 1,
        explain: "map squares each element.",
      },
      {
        q: "Which method starts a new thread of execution?",
        options: ["run()", "start()", "execute()", "begin()"],
        answer: 1,
        explain: "start() creates a new thread that calls run(); calling run() directly runs on the current thread.",
      },
    ],
    challenge: {
      title: "Stream pipeline",
      prompt: md`Given «List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);», use a **stream** to keep only the **even** numbers, **square** them, and collect them into a list. Print the list. Expected: «[4, 16, 36, 64, 100]».`,
      starter: `import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    }
}`,
      rules: [
        { re: /nums\s*\.\s*stream\s*\(\s*\)/, msg: "Start with nums.stream()" },
        { re: /\.filter\s*\(\s*(\w+)\s*->\s*\1\s*%\s*2\s*==\s*0\s*\)/, msg: "Keep even numbers with .filter(n -> n % 2 == 0)" },
        { re: /\.map\s*\(\s*(\w+)\s*->\s*\1\s*\*\s*\1\s*\)/, msg: "Square each number with .map(n -> n * n)" },
        { re: /\.collect\s*\(\s*Collectors\.toList\s*\(\s*\)\s*\)|\.toList\s*\(\s*\)/, msg: "Collect into a list with .collect(Collectors.toList()) or .toList()" },
        { re: /System\.out\.println/, msg: "Print the resulting list" },
      ],
      forbid: [{ re: /\bfor\s*\(/, msg: "Use the Streams API instead of a for loop" }],
      solution: `import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        List<Integer> result = nums.stream()
                .filter(n -> n % 2 == 0)
                .map(n -> n * n)
                .collect(Collectors.toList());
        System.out.println(result);
    }
}`,
    },
  },
];

export const FINAL_EXAM = [
  {
    q: "Which tool converts .java source files into bytecode?",
    options: ["java", "javac", "JVM", "javadoc"],
    answer: 1,
    explain: "javac is the Java compiler.",
  },
  {
    q: "What is printed by «System.out.println(10 / 4 * 2.0);»?",
    options: ["5.0", "4.0", "4", "5"],
    answer: 1,
    explain: "10 / 4 is integer division = 2, then 2 * 2.0 = 4.0.",
  },
  {
    q: "Which loop is guaranteed to execute at least once?",
    options: ["for", "while", "do-while", "for-each"],
    answer: 2,
    explain: "do-while checks its condition after the body.",
  },
  {
    q: "What does «\"Journify\".charAt(3)» return?",
    options: ["'r'", "'u'", "'n'", "'o'"],
    answer: 0,
    explain: "Indexes: J0 o1 u2 r3.",
  },
  {
    q: "What is the correct way to compare the text of two Strings a and b?",
    options: ["a == b", "a.equals(b)", "a = b", "a.compareTo(b) == true"],
    answer: 1,
    explain: "equals() compares content; == compares references.",
  },
  {
    q: "Which statement about method overloading is correct?",
    options: [
      "Methods must have different names",
      "Methods must have different parameter lists",
      "Only the return type must differ",
      "It requires inheritance",
    ],
    answer: 1,
    explain: "Overloaded methods share a name but differ in parameters.",
  },
  {
    q: "Which OOP principle is mainly achieved by private fields with public getters/setters?",
    options: ["Inheritance", "Polymorphism", "Encapsulation", "Recursion"],
    answer: 2,
    explain: "Encapsulation hides internal state and controls access to it.",
  },
  {
    q: "What does «super(name)» inside a constructor do?",
    options: [
      "Calls the parent class constructor",
      "Creates a new superclass",
      "Calls a static method",
      "Refers to the current object",
    ],
    answer: 0,
    explain: "super(...) invokes the parent constructor and must be the first statement.",
  },
  {
    q: "Which can a class do in Java?",
    options: [
      "Extend multiple classes",
      "Implement multiple interfaces",
      "Extend an interface with extends",
      "Instantiate an abstract class",
    ],
    answer: 1,
    explain: "A class can extend one class but implement many interfaces.",
  },
  {
    q: "Polymorphism in «Animal a = new Dog(); a.sound();» means…",
    options: [
      "Animal's sound always runs",
      "The overridden Dog version runs at runtime",
      "It's a compile error",
      "Both versions run",
    ],
    answer: 1,
    explain: "Dynamic dispatch selects the actual object's overridden method.",
  },
  {
    q: "Which must be caught or declared with throws?",
    options: ["NullPointerException", "IOException", "ArithmeticException", "IllegalArgumentException"],
    answer: 1,
    explain: "IOException is a checked exception.",
  },
  {
    q: "Which collection maps unique keys to values?",
    options: ["ArrayList", "HashSet", "HashMap", "Array"],
    answer: 2,
    explain: "HashMap stores key-value pairs with unique keys.",
  },
  {
    q: "Why can't you write «List<int>»?",
    options: [
      "Lists can't hold numbers",
      "Generics only work with object types, so use Integer",
      "int is deprecated",
      "You can — it's valid",
    ],
    answer: 1,
    explain: "Type parameters must be reference types; use wrapper classes like Integer.",
  },
  {
    q: "What does «List.of(3, 8, 5).stream().filter(n -> n > 4).count()» return?",
    options: ["1", "2", "3", "13"],
    answer: 1,
    explain: "8 and 5 are greater than 4.",
  },
  {
    q: "What happens if you call «run()» instead of «start()» on a Thread?",
    options: [
      "A new thread is created twice",
      "The code runs on the current thread, not a new one",
      "A compile error",
      "The JVM exits",
    ],
    answer: 1,
    explain: "Only start() creates a new thread; run() is an ordinary method call.",
  },
];
