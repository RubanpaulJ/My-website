// C programming course. Same lesson markdown as the other courses.
const md = String.raw;

const MODULES = [
  {
    id: "c1",
    title: "Introduction to C",
    summary: "Why C matters, how programs are compiled and your first program.",
    lessons: [
      {
        title: "What is C?",
        minutes: 15,
        body: md`C is a **procedural, general-purpose language** created by Dennis Ritchie at Bell Labs in 1972 to write the UNIX operating system. Half a century later it still runs the world.

### Where C is used
- Operating systems — Linux, Windows and macOS kernels
- Embedded systems — microcontrollers, IoT devices, cars, washing machines
- Databases (SQLite, MySQL), compilers and interpreters (CPython is written in C)
- Game engines and high-performance libraries

### Why learn C?
- It teaches how computers really work: **memory, addresses and pointers**.
- It's fast and small — close to the hardware.
- Languages like C++, Java, C# and JavaScript borrow its syntax.
- It's a core subject in engineering curricula and interviews.

> C gives you power **and** responsibility: there's no garbage collector and no bounds checking.`,
      },
      {
        title: "Your first C program",
        minutes: 15,
        body: md`~~~c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    return 0;
}
~~~

### Line by line
- «#include <stdio.h>» — includes the standard input/output header so we can use «printf».
- «int main(void)» — execution starts at «main». It returns an «int» to the operating system.
- «printf(...)» — prints formatted text. «\n» is a newline.
- «return 0;» — tells the OS the program finished successfully.
- Statements end with «;» and blocks use «{ }».

### Escape sequences
«\n» newline, «\t» tab, «\\» backslash, «\"» double quote.`,
      },
      {
        title: "Compiling and running",
        minutes: 15,
        body: md`C is a **compiled** language. Source code goes through several stages:
- **Preprocessing** — handles «#include» and «#define»
- **Compilation** — turns C into assembly / object code
- **Linking** — combines object files and libraries into an executable

### With GCC
~~~bash
gcc hello.c -o hello      # compile
./hello                   # run (Linux / macOS)
hello.exe                 # run (Windows)
~~~
Add «-Wall -Wextra» to see helpful warnings: «gcc -Wall -Wextra hello.c -o hello».

### Tools
- Windows: install **MinGW-w64** or use **Code::Blocks** / **Dev-C++**
- Any OS: **VS Code** with the C/C++ extension
- Online: compilers like OnlineGDB are handy for quick tests

### Comments
~~~c
// single-line comment (C99 and later)
/* multi-line
   comment */
~~~`,
      },
    ],
    quiz: [
      { q: "Who created the C language?", options: ["James Gosling", "Dennis Ritchie", "Guido van Rossum", "Bjarne Stroustrup"], answer: 1, explain: "Dennis Ritchie created C at Bell Labs." },
      { q: "Which header is needed for printf?", options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<math.h>"], answer: 1, explain: "printf is declared in stdio.h." },
      { q: "What does «return 0;» in main indicate?", options: ["An error", "Successful termination", "Infinite loop", "Nothing"], answer: 1, explain: "0 tells the OS the program succeeded." },
      { q: "Which stage combines object files into an executable?", options: ["Preprocessing", "Compiling", "Linking", "Interpreting"], answer: 2, explain: "The linker produces the final executable." },
      { q: "What is «\\n» in a printf string?", options: ["A tab", "A newline", "A null byte", "A backslash"], answer: 1, explain: "\\n moves output to a new line." },
    ],
    challenge: {
      title: "Hello, Journify!",
      prompt: md`Write a complete C program that prints two lines:
~~~
Hello, Journify!
I am learning C
~~~`,
      starter: md`#include <stdio.h>

int main(void) {
    // write your code here

    return 0;
}`,
      rules: [
        { re: /#include\s*<stdio\.h>/, msg: "Include <stdio.h>" },
        { re: /int\s+main\s*\(\s*(void)?\s*\)/, msg: "Define int main(void)" },
        { re: /printf\s*\(\s*"Hello, Journify!(\\n)?"/, msg: 'Print "Hello, Journify!" with printf' },
        { re: /printf\s*\([^;]*I am learning C/, msg: 'Print "I am learning C"' },
        { re: /return\s+0\s*;/, msg: "End main with return 0;" },
      ],
      solution: md`#include <stdio.h>

int main(void) {
    printf("Hello, Journify!\n");
    printf("I am learning C\n");
    return 0;
}`,
    },
  },
  {
    id: "c2",
    title: "Variables, Data Types & Constants",
    summary: "Primitive types, sizes, format specifiers and constants.",
    lessons: [
      {
        title: "Variables and basic types",
        minutes: 15,
        body: md`Every variable must be **declared with a type** before use.
~~~c
int age = 20;
float cgpa = 8.5f;
double pi = 3.14159265;
char grade = 'A';
~~~

### Basic types (typical sizes on 64-bit systems)
- «char» — 1 byte, a single character or small integer
- «short» — 2 bytes
- «int» — 4 bytes
- «long» / «long long» — 8 bytes
- «float» — 4 bytes (~7 digits precision)
- «double» — 8 bytes (~15 digits precision)

Add «unsigned» for non-negative only, doubling the positive range: «unsigned int count;».

Use «sizeof» to check: «printf("%zu\n", sizeof(int));»

> An uninitialised local variable contains **garbage**. Always initialise: «int total = 0;».`,
      },
      {
        title: "printf format specifiers",
        minutes: 15,
        body: md`~~~c
int n = 42;
float f = 3.5f;
double d = 2.71828;
char c = 'J';
char name[] = "Journify";

printf("%d\n", n);        // 42
printf("%f\n", f);        // 3.500000
printf("%.2f\n", d);      // 2.72
printf("%c\n", c);        // J
printf("%s\n", name);     // Journify
printf("%5d|\n", n);      //    42|  (width 5)
printf("%x\n", 255);      // ff  (hexadecimal)
printf("%p\n", (void *)&n); // memory address
~~~
- «%d» / «%i» int, «%ld» long, «%lld» long long, «%u» unsigned
- «%f» float/double, «%e» scientific
- «%c» char, «%s» string, «%%» a literal percent sign`,
      },
      {
        title: "Constants and type conversion",
        minutes: 15,
        body: md`### Constants
~~~c
#define MAX_STUDENTS 60        // preprocessor macro — text substitution
const double GST = 0.18;       // typed constant
~~~

### Implicit conversion
In mixed expressions the smaller type is promoted: «int + double» → «double».

### Integer division
~~~c
int a = 7, b = 2;
printf("%d\n", a / b);            // 3
printf("%.1f\n", (double)a / b);  // 3.5  — explicit cast
~~~

### Overflow
~~~c
int big = 2147483647;
big = big + 1;   // signed overflow — undefined behaviour!
~~~
> Choose types that fit your data. For money, use integers in paise rather than floats.`,
      },
    ],
    quiz: [
      { q: "Which format specifier prints an int?", options: ["%f", "%d", "%s", "%c"], answer: 1, explain: "%d is for signed int." },
      { q: "What is the value of an uninitialised local int?", options: ["0", "-1", "Unpredictable (garbage)", "NULL"], answer: 2, explain: "Local variables aren't automatically initialised." },
      { q: "What does «printf(\"%.2f\", 3.14159)» print?", options: ["3.14159", "3.14", "3.1", "3"], answer: 1, explain: ".2 limits to two decimal places." },
      { q: "What is «7 / 2» when both are int?", options: ["3.5", "3", "4", "Error"], answer: 1, explain: "Integer division truncates." },
      { q: "Which operator gives the size of a type in bytes?", options: ["length", "sizeof", "size", "bytes"], answer: 1, explain: "sizeof returns the size in bytes." },
    ],
    challenge: {
      title: "Student profile",
      prompt: md`Declare «int age = 20;», «float cgpa = 8.5f;» and «char grade = 'A';», then print them on one line using the correct format specifiers, with cgpa shown to **one** decimal place: «Age: 20, CGPA: 8.5, Grade: A».`,
      starter: md`#include <stdio.h>

int main(void) {

    return 0;
}`,
      rules: [
        { re: /int\s+age\s*=\s*20\s*;/, msg: "Declare int age = 20;" },
        { re: /(float|double)\s+cgpa\s*=\s*8\.5f?\s*;/, msg: "Declare float cgpa = 8.5f;" },
        { re: /char\s+grade\s*=\s*'A'\s*;/, msg: "Declare char grade = 'A';" },
        { re: /printf\s*\([^;]*%d[^;]*%\.1f[^;]*%c/, msg: "Print with %d, %.1f and %c in that order" },
      ],
      solution: md`#include <stdio.h>

int main(void) {
    int age = 20;
    float cgpa = 8.5f;
    char grade = 'A';
    printf("Age: %d, CGPA: %.1f, Grade: %c\n", age, cgpa, grade);
    return 0;
}`,
    },
  },
  {
    id: "c3",
    title: "Operators & Input",
    summary: "Arithmetic, relational, logical and bitwise operators, and scanf.",
    lessons: [
      {
        title: "Arithmetic and assignment",
        minutes: 15,
        body: md`«+  -  *  /  %» and compound forms «+=  -=  *=  /=  %=».
~~~c
int total = 17;
printf("%d %d\n", total / 5, total % 5);   // 3 2
~~~
«%» works only with integers. Use «fmod» from «<math.h>» for floating-point remainders.

### Increment and decrement
~~~c
int i = 5;
int a = i++;   // a = 5, i = 6  (post)
int b = ++i;   // i = 7, b = 7  (pre)
~~~
> Never modify the same variable twice in one expression, like «i = i++ + ++i;» — that's undefined behaviour.`,
      },
      {
        title: "Relational, logical and bitwise operators",
        minutes: 15,
        body: md`### Relational and logical
C has no built-in «bool» before C99 — conditions are ints: **0 is false, anything else is true**.
~~~c
int marks = 72;
int passed = marks >= 40;                 // 1
int eligible = marks >= 60 && att >= 75;  // && AND, || OR, ! NOT
~~~
Include «<stdbool.h>» to use «bool», «true» and «false».

### Bitwise operators
Work on individual bits — essential in embedded programming.
~~~c
unsigned int x = 6;   // 0110
unsigned int y = 3;   // 0011
x & y    // 0010 = 2  AND
x | y    // 0111 = 7  OR
x ^ y    // 0101 = 5  XOR
~x       // flips all bits
x << 1   // 1100 = 12 (multiply by 2)
x >> 1   // 0011 = 3  (divide by 2)
~~~
Check if n is even: «(n & 1) == 0».`,
      },
      {
        title: "Reading input with scanf",
        minutes: 15,
        body: md`«scanf» reads formatted input. Pass the **address** of each variable with «&».
~~~c
#include <stdio.h>

int main(void) {
    int a, b;
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);
    printf("Sum = %d\n", a + b);
    return 0;
}
~~~

### Reading other types
~~~c
float price;     scanf("%f", &price);
double d;        scanf("%lf", &d);     // note %lf for double in scanf
char c;          scanf(" %c", &c);     // space skips leftover newline
char name[50];   scanf("%49s", name);  // no & for arrays; limit width
~~~
> «scanf("%s")» stops at the first space. To read a full line, use «fgets(name, sizeof name, stdin);».`,
      },
    ],
    quiz: [
      { q: "In C, which value is treated as false?", options: ["1", "-1", "0", "Any negative number"], answer: 2, explain: "Only 0 is false." },
      { q: "Why do you write «&x» in scanf(\"%d\", &x)?", options: ["It's a typo", "scanf needs the variable's address", "To make x a pointer type", "For formatting"], answer: 1, explain: "scanf writes into memory at the given address." },
      { q: "What is «6 & 3»?", options: ["9", "7", "2", "5"], answer: 2, explain: "0110 & 0011 = 0010 = 2." },
      { q: "Which specifier reads a double with scanf?", options: ["%f", "%lf", "%d", "%df"], answer: 1, explain: "scanf needs %lf for double." },
      { q: "What is «x << 1» equivalent to for a non-negative int x?", options: ["x / 2", "x * 2", "x + 1", "x - 1"], answer: 1, explain: "Shifting left by one doubles the value." },
    ],
    challenge: {
      title: "Sum and average",
      prompt: md`Read **two integers** with «scanf», then print their **sum** and their **average** as a decimal (e.g. 7 and 8 → «Sum = 15», «Average = 7.50»).`,
      starter: md`#include <stdio.h>

int main(void) {

    return 0;
}`,
      rules: [
        { re: /scanf\s*\(\s*"%d\s*%d"\s*,\s*&\w+\s*,\s*&\w+\s*\)|scanf\s*\(\s*"%d"\s*,\s*&\w+\s*\)[\s\S]*scanf\s*\(\s*"%d"\s*,\s*&\w+\s*\)/, msg: "Read two integers with scanf and &" },
        { re: /\w+\s*\+\s*\w+/, msg: "Add the numbers" },
        { re: /\(\s*(float|double)\s*\)|\/\s*2\.0/, msg: "Compute the average as a decimal (cast or divide by 2.0)" },
        { re: /printf\s*\([^;]*%\.?\d*f/, msg: "Print the average with %f (e.g. %.2f)" },
      ],
      solution: md`#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    int sum = a + b;
    double avg = sum / 2.0;
    printf("Sum = %d\n", sum);
    printf("Average = %.2f\n", avg);
    return 0;
}`,
    },
  },
  {
    id: "c4",
    title: "Decision Making",
    summary: "if-else ladders, nested conditions, switch and the ternary operator.",
    lessons: [
      {
        title: "if, else if and else",
        minutes: 15,
        body: md`~~~c
int marks = 68;

if (marks >= 90) {
    printf("Grade A\n");
} else if (marks >= 75) {
    printf("Grade B\n");
} else if (marks >= 50) {
    printf("Grade C\n");
} else {
    printf("Fail\n");
}
~~~

### Classic bug: = vs ==
~~~c
if (x = 5) { ... }   // assigns 5, always true!
if (x == 5) { ... }  // compares
~~~
Compile with «-Wall» and GCC will warn you about this.

> Always use braces. Without them only the next single statement belongs to the if.`,
      },
      {
        title: "switch statements",
        minutes: 15,
        body: md`~~~c
int choice;
scanf("%d", &choice);

switch (choice) {
    case 1:
        printf("Check balance\n");
        break;
    case 2:
        printf("Withdraw\n");
        break;
    case 3:
    case 4:
        printf("Deposit or transfer\n");   // shared by 3 and 4
        break;
    default:
        printf("Invalid option\n");
}
~~~
- «switch» works with integer types and «char» — not strings or floats.
- Case labels must be constants.
- Without «break», execution **falls through** to the next case.`,
      },
      {
        title: "Ternary operator and nested logic",
        minutes: 15,
        body: md`### Ternary operator
~~~c
int max = (a > b) ? a : b;
printf("%s\n", marks >= 40 ? "Pass" : "Fail");
~~~

### Largest of three
~~~c
int largest;
if (a >= b && a >= c) {
    largest = a;
} else if (b >= c) {
    largest = b;
} else {
    largest = c;
}
~~~

### Leap year
~~~c
if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    printf("Leap year\n");
}
~~~
These small programs appear in almost every C lab exam — make sure you can write them from memory.`,
      },
    ],
    quiz: [
      { q: "What does «if (x = 0)» do?", options: ["Compares x to 0", "Assigns 0 to x and the condition is false", "Compile error", "Assigns and is always true"], answer: 1, explain: "It assigns 0, and 0 is false." },
      { q: "Which types can a C switch use?", options: ["Strings", "float and double", "Integer types and char", "Any type"], answer: 2, explain: "switch requires integral values." },
      { q: "What happens without break in a case?", options: ["Compile error", "Falls through to the next case", "Loop restarts", "Program exits"], answer: 1, explain: "Execution continues into the following case." },
      { q: "What is «(5 > 3) ? 10 : 20»?", options: ["5", "10", "20", "1"], answer: 1, explain: "The condition is true, so 10." },
      { q: "Is 1900 a leap year?", options: ["Yes", "No"], answer: 1, explain: "Divisible by 100 but not 400, so not a leap year." },
    ],
    challenge: {
      title: "Leap year checker",
      prompt: md`Given «int year = 2024;», print «Leap year» or «Not a leap year» using the full rule: divisible by 4 **and** not by 100, **or** divisible by 400.`,
      starter: md`#include <stdio.h>

int main(void) {
    int year = 2024;

    return 0;
}`,
      rules: [
        { re: /year\s*%\s*4\s*==\s*0/, msg: "Check year % 4 == 0" },
        { re: /year\s*%\s*100\s*!=\s*0/, msg: "Check year % 100 != 0" },
        { re: /year\s*%\s*400\s*==\s*0/, msg: "Check year % 400 == 0" },
        { re: /&&/, msg: "Combine with && (AND)" },
        { re: /\|\|/, msg: "Combine with || (OR)" },
        { re: /"Leap year/, msg: 'Print "Leap year"' },
        { re: /Not a leap year/, msg: 'Print "Not a leap year" in the else branch' },
      ],
      solution: md`#include <stdio.h>

int main(void) {
    int year = 2024;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        printf("Leap year\n");
    } else {
        printf("Not a leap year\n");
    }
    return 0;
}`,
    },
  },
  {
    id: "c5",
    title: "Loops",
    summary: "for, while and do-while loops, break, continue and patterns.",
    lessons: [
      {
        title: "for loops",
        minutes: 15,
        body: md`~~~c
for (int i = 1; i <= 5; i++) {
    printf("%d ", i);
}
// 1 2 3 4 5
~~~
Initialisation runs once, the condition is checked before each iteration, and the update runs after each one.

### Sum and factorial
~~~c
int sum = 0;
for (int i = 1; i <= 100; i++) sum += i;      // 5050

long long fact = 1;
for (int i = 2; i <= 10; i++) fact *= i;      // 3628800
~~~
> Declaring «int i» inside the for header needs C99 or later («gcc -std=c99» or newer — modern GCC defaults to this).`,
      },
      {
        title: "while and do-while",
        minutes: 15,
        body: md`### while — check first
~~~c
int n = 12345, reversed = 0;
while (n > 0) {
    reversed = reversed * 10 + n % 10;
    n /= 10;
}
printf("%d\n", reversed);   // 54321
~~~

### do-while — body runs at least once
~~~c
int choice;
do {
    printf("1. Play  2. Exit\n");
    scanf("%d", &choice);
} while (choice != 2);
~~~
Perfect for menus that must show at least once.`,
      },
      {
        title: "break, continue and nested loops",
        minutes: 15,
        body: md`~~~c
for (int i = 1; i <= 10; i++) {
    if (i == 8) break;
    if (i % 2 == 0) continue;
    printf("%d ", i);      // 1 3 5 7
}
~~~

### Prime check
~~~c
int n = 29, isPrime = n > 1;
for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) { isPrime = 0; break; }
}
~~~

### Star pyramid
~~~c
int rows = 4;
for (int i = 1; i <= rows; i++) {
    for (int s = 1; s <= rows - i; s++) printf(" ");
    for (int j = 1; j <= 2 * i - 1; j++) printf("*");
    printf("\n");
}
~~~
~~~
   *
  ***
 *****
*******
~~~`,
      },
    ],
    quiz: [
      { q: "Which loop always runs its body at least once?", options: ["for", "while", "do-while", "None"], answer: 2, explain: "do-while checks after the body." },
      { q: "What does «n % 10» give for n = 1234?", options: ["123", "4", "1", "12"], answer: 1, explain: "% 10 gives the last digit." },
      { q: "Why check divisors only while «i * i <= n» in a prime test?", options: ["It's required syntax", "Any factor larger than √n pairs with one smaller than √n", "To avoid overflow", "It's slower but safer"], answer: 1, explain: "Checking up to √n is sufficient and much faster." },
      { q: "How many times does «for (int i = 0; i < 10; i += 3)» run?", options: ["3", "4", "10", "9"], answer: 1, explain: "i = 0, 3, 6, 9." },
      { q: "What does continue do in a for loop?", options: ["Exits the loop", "Jumps to the update step and next iteration", "Restarts from i = 0", "Nothing"], answer: 1, explain: "continue skips the rest of the body." },
    ],
    challenge: {
      title: "Reverse a number",
      prompt: md`Given «int n = 12345;», use a **while loop** with «%» and «/» to build the reversed number and print it: «54321».`,
      starter: md`#include <stdio.h>

int main(void) {
    int n = 12345;

    return 0;
}`,
      rules: [
        { re: /(int\s+|,\s*)\w+\s*=\s*0\s*[;,]/, msg: "Start with a result variable set to 0" },
        { re: /while\s*\(\s*n\s*(>|!=)\s*0\s*\)/, msg: "Loop with while (n > 0)" },
        { re: /\w+\s*=\s*\w+\s*\*\s*10\s*\+\s*n\s*%\s*10/, msg: "Build it with reversed = reversed * 10 + n % 10" },
        { re: /n\s*(\/=\s*10|=\s*n\s*\/\s*10)/, msg: "Remove the last digit with n /= 10" },
        { re: /printf\s*\(\s*"%d/, msg: "Print the result with %d" },
      ],
      solution: md`#include <stdio.h>

int main(void) {
    int n = 12345, reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }
    printf("%d\n", reversed);
    return 0;
}`,
    },
  },
  {
    id: "c6",
    title: "Arrays & Strings",
    summary: "1D and 2D arrays, character strings and string.h.",
    lessons: [
      {
        title: "Arrays",
        minutes: 15,
        body: md`~~~c
int marks[5] = {78, 92, 65, 88, 70};
printf("%d\n", marks[0]);   // 78

int n = sizeof(marks) / sizeof(marks[0]);   // 5 elements
for (int i = 0; i < n; i++) {
    printf("%d ", marks[i]);
}
~~~
- Indexes run from «0» to «size - 1».
- C does **no bounds checking** — «marks[10]» compiles but reads random memory (undefined behaviour).
- «int a[5] = {0};» sets every element to 0.
- An array's size is fixed when it's declared.`,
      },
      {
        title: "2D arrays and searching/sorting",
        minutes: 15,
        body: md`### 2D arrays
~~~c
int m[2][3] = {{1, 2, 3}, {4, 5, 6}};
for (int r = 0; r < 2; r++) {
    for (int c = 0; c < 3; c++) printf("%d ", m[r][c]);
    printf("\n");
}
~~~

### Linear search
~~~c
int key = 88, pos = -1;
for (int i = 0; i < n; i++) {
    if (marks[i] == key) { pos = i; break; }
}
~~~

### Bubble sort
~~~c
for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - 1 - i; j++) {
        if (a[j] > a[j + 1]) {
            int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
        }
    }
}
~~~`,
      },
      {
        title: "Strings and string.h",
        minutes: 15,
        body: md`A C string is a **char array ending with the null character «'\0'»**.
~~~c
char name[] = "Asha";       // {'A','s','h','a','\0'} — 5 bytes
char city[20] = "Chennai";
~~~

### string.h functions
~~~c
#include <string.h>

strlen(city);                 // 7 (doesn't count '\0')
strcpy(dest, src);            // copy
strcat(dest, " Tamil Nadu");  // append
strcmp(a, b);                 // 0 if equal, <0 or >0 otherwise
strncpy(dest, src, sizeof dest - 1);  // safer, bounded copy
~~~
> Never compare strings with «==» — that compares addresses. Use «strcmp(a, b) == 0».

### Reading a line safely
~~~c
char line[100];
fgets(line, sizeof line, stdin);
line[strcspn(line, "\n")] = '\0';   // remove trailing newline
~~~`,
      },
    ],
    quiz: [
      { q: "What character marks the end of a C string?", options: ["'\\n'", "'\\0'", "'$'", "EOF"], answer: 1, explain: "Strings end with the null character." },
      { q: "How many bytes does «char s[] = \"Java\";» use?", options: ["4", "5", "6", "8"], answer: 1, explain: "4 characters plus '\\0'." },
      { q: "How should two strings be compared for equality?", options: ["a == b", "strcmp(a, b) == 0", "a.equals(b)", "strlen(a) == strlen(b)"], answer: 1, explain: "strcmp compares contents." },
      { q: "What happens when you access arr[10] in a 5-element array?", options: ["Compile error", "Runtime exception", "Undefined behaviour — no bounds check", "Returns 0"], answer: 2, explain: "C doesn't check array bounds." },
      { q: "How do you get the number of elements of a local array a?", options: ["a.length", "len(a)", "sizeof(a) / sizeof(a[0])", "strlen(a)"], answer: 2, explain: "Total bytes divided by bytes per element." },
    ],
    challenge: {
      title: "Find the maximum",
      prompt: md`Given «int nums[] = {12, 45, 7, 89, 23};», compute the number of elements with «sizeof», loop through the array to find the **largest** value, and print it (89).`,
      starter: md`#include <stdio.h>

int main(void) {
    int nums[] = {12, 45, 7, 89, 23};

    return 0;
}`,
      rules: [
        { re: /sizeof\s*\(?\s*nums\s*\)?\s*\/\s*sizeof\s*\(?\s*nums\s*\[\s*0\s*\]\s*\)?/, msg: "Count elements with sizeof(nums) / sizeof(nums[0])" },
        { re: /int\s+max\s*=\s*nums\s*\[\s*0\s*\]\s*;/, msg: "Start with int max = nums[0];" },
        { re: /for\s*\(/, msg: "Loop over the array" },
        { re: /if\s*\(\s*nums\s*\[\s*\w+\s*\]\s*>\s*max\s*\)/, msg: "Compare with if (nums[i] > max)" },
        { re: /printf\s*\([^;]*max/, msg: "Print max" },
      ],
      solution: md`#include <stdio.h>

int main(void) {
    int nums[] = {12, 45, 7, 89, 23};
    int n = sizeof(nums) / sizeof(nums[0]);
    int max = nums[0];
    for (int i = 1; i < n; i++) {
        if (nums[i] > max) {
            max = nums[i];
        }
    }
    printf("%d\n", max);
    return 0;
}`,
    },
  },
  {
    id: "c7",
    title: "Functions & Recursion",
    summary: "Declaring, defining and calling functions; scope and recursion.",
    lessons: [
      {
        title: "Defining and calling functions",
        minutes: 15,
        body: md`~~~c
#include <stdio.h>

int square(int n);          // prototype (declaration)

int main(void) {
    printf("%d\n", square(6));   // 36
    return 0;
}

int square(int n) {         // definition
    return n * n;
}
~~~
- A **prototype** tells the compiler the function's name, return type and parameters before it's used.
- «void» return type means no value is returned.
- «void» in the parameter list means "takes no arguments".

> Put prototypes at the top (or in a header file) so functions can be defined in any order.`,
      },
      {
        title: "Pass by value and scope",
        minutes: 15,
        body: md`C passes arguments **by value** — the function gets a copy.
~~~c
void tryChange(int x) { x = 100; }

int a = 5;
tryChange(a);
printf("%d\n", a);   // still 5
~~~
To let a function modify the caller's variable, pass its **address** (pointers — next module).

### Scope and storage classes
- **Local** variables live inside a block and disappear when it ends.
- **Global** variables are declared outside all functions — visible everywhere (use sparingly).
- «static» local variable keeps its value between calls:
~~~c
void counter(void) {
    static int count = 0;
    count++;
    printf("Called %d times\n", count);
}
~~~
- «extern» declares a global defined in another file.`,
      },
      {
        title: "Recursion",
        minutes: 15,
        body: md`~~~c
long long factorial(int n) {
    if (n <= 1) return 1;            // base case
    return n * factorial(n - 1);     // recursive case
}

int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}

int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);   // Euclid's algorithm
}
~~~
Each call gets its own **stack frame**. Too-deep recursion causes a **stack overflow** crash.

### Tower of Hanoi
~~~c
void hanoi(int n, char from, char to, char via) {
    if (n == 0) return;
    hanoi(n - 1, from, via, to);
    printf("Move disk %d from %c to %c\n", n, from, to);
    hanoi(n - 1, via, to, from);
}
~~~`,
      },
    ],
    quiz: [
      { q: "What is a function prototype?", options: ["The function body", "A declaration of the function's signature before use", "A macro", "A comment"], answer: 1, explain: "Prototypes declare name, return type and parameters." },
      { q: "C passes ordinary arguments…", options: ["By reference", "By value", "By name", "By pointer automatically"], answer: 1, explain: "Functions receive copies." },
      { q: "A static local variable…", options: ["Is reset each call", "Keeps its value between calls", "Is global to all files", "Can't be changed"], answer: 1, explain: "static gives the variable a lifetime of the whole program." },
      { q: "What is gcd(48, 18) using Euclid's algorithm?", options: ["2", "6", "9", "18"], answer: 1, explain: "48→18→12→6→0, so 6." },
      { q: "What does a missing base case in recursion cause?", options: ["Compile error", "Stack overflow", "Returns 0", "Infinite output only"], answer: 1, explain: "Calls never stop and exhaust the stack." },
    ],
    challenge: {
      title: "Recursive factorial",
      prompt: md`Write a **recursive** function «long long factorial(int n)» with a base case. Call it from «main» and print «factorial(10)» using «%lld».`,
      starter: md`#include <stdio.h>

// write factorial here

int main(void) {

    return 0;
}`,
      rules: [
        { re: /(long\s+long|long|int)\s+factorial\s*\(\s*int\s+\w+\s*\)\s*\{/, msg: "Define long long factorial(int n)" },
        { re: /if\s*\(\s*\w+\s*(<=\s*1|==\s*0|==\s*1|<\s*2)\s*\)/, msg: "Add a base case like if (n <= 1) return 1;" },
        { re: /return\s+\w+\s*\*\s*factorial\s*\(\s*\w+\s*-\s*1\s*\)/, msg: "Recursive case: return n * factorial(n - 1);" },
        { re: /printf\s*\(\s*"%lld[^"]*"\s*,\s*factorial\s*\(\s*10\s*\)\s*\)/, msg: 'Print with printf("%lld\\n", factorial(10))' },
      ],
      forbid: [{ re: /\bfor\s*\(|\bwhile\s*\(/, msg: "Use recursion, not a loop" }],
      solution: md`#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main(void) {
    printf("%lld\n", factorial(10));
    return 0;
}`,
    },
  },
  {
    id: "c8",
    title: "Pointers",
    summary: "Addresses, dereferencing, pointer arithmetic and pass-by-reference.",
    lessons: [
      {
        title: "Pointer basics",
        minutes: 15,
        body: md`A **pointer** stores a memory address.
~~~c
int x = 10;
int *p = &x;          // p holds the address of x

printf("%d\n", x);    // 10
printf("%p\n", (void *)p);  // address, e.g. 0x7ffd...
printf("%d\n", *p);   // 10  — dereference: value at that address

*p = 25;              // changes x through the pointer
printf("%d\n", x);    // 25
~~~
- «&» — "address of"
- «*» in a declaration — "pointer to"
- «*» in an expression — "value at" (dereference)

### NULL pointers
~~~c
int *q = NULL;
if (q != NULL) { printf("%d", *q); }
~~~
Dereferencing NULL or an uninitialised pointer crashes the program (segmentation fault).`,
      },
      {
        title: "Pointers and arrays",
        minutes: 15,
        body: md`An array name decays to a pointer to its first element.
~~~c
int a[] = {10, 20, 30};
int *p = a;            // same as &a[0]

printf("%d\n", *p);        // 10
printf("%d\n", *(p + 1));  // 20  — pointer arithmetic
printf("%d\n", p[2]);      // 30  — p[i] means *(p + i)
~~~
Adding 1 to an «int *» moves forward by «sizeof(int)» bytes, not 1 byte.

### Walking an array with a pointer
~~~c
for (int *q = a; q < a + 3; q++) {
    printf("%d ", *q);
}
~~~

### Pointer to pointer
~~~c
int **pp = &p;
printf("%d\n", **pp);   // 10
~~~`,
      },
      {
        title: "Pass by reference and function pointers",
        minutes: 15,
        body: md`### Modifying the caller's variables
~~~c
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int x = 3, y = 7;
swap(&x, &y);   // x = 7, y = 3
~~~
This is how «scanf» writes into your variables.

### Passing arrays
Arrays are always passed as pointers, so pass the length too:
~~~c
int sum(const int *arr, int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += arr[i];
    return s;
}
~~~
«const» promises the function won't modify the array.

### Function pointers
~~~c
int add(int a, int b) { return a + b; }
int (*op)(int, int) = add;
printf("%d\n", op(2, 3));   // 5
~~~
Used for callbacks, like the comparator passed to «qsort».`,
      },
    ],
    quiz: [
      { q: "If «int x = 5; int *p = &x;», what is *p?", options: ["The address of x", "5", "p's own address", "Undefined"], answer: 1, explain: "*p dereferences to the value of x." },
      { q: "What does «&x» give?", options: ["The value of x", "The address of x", "A copy of x", "x squared"], answer: 1, explain: "& is the address-of operator." },
      { q: "If p points to a[0] in an int array, what is *(p + 2)?", options: ["a[0] + 2", "a[2]", "The address of a[2]", "Error"], answer: 1, explain: "*(p + i) is equivalent to p[i]." },
      { q: "Why does swap need «int *a, int *b» parameters?", options: ["Pointers are faster", "To modify the caller's variables", "Ints can't be swapped otherwise in C syntax", "It's required by the compiler"], answer: 1, explain: "Passing addresses lets the function change the originals." },
      { q: "What happens when you dereference a NULL pointer?", options: ["Returns 0", "Undefined behaviour, usually a crash", "Compile error", "Allocates memory"], answer: 1, explain: "NULL doesn't point to valid memory." },
    ],
    challenge: {
      title: "Swap with pointers",
      prompt: md`Write «void swap(int *a, int *b)» that swaps two integers using a temporary variable and pointers. In «main», swap «x = 3» and «y = 7» by passing their **addresses**, then print «x = 7, y = 3».`,
      starter: md`#include <stdio.h>

// write swap here

int main(void) {
    int x = 3, y = 7;

    return 0;
}`,
      rules: [
        { re: /void\s+swap\s*\(\s*int\s*\*\s*\w+\s*,\s*int\s*\*\s*\w+\s*\)/, msg: "Define void swap(int *a, int *b)" },
        { re: /int\s+\w+\s*=\s*\*\s*\w+\s*;/, msg: "Store *a in a temporary: int temp = *a;" },
        { re: /\*\s*\w+\s*=\s*\*\s*\w+\s*;/, msg: "Copy *b into *a" },
        { re: /\*\s*\w+\s*=\s*temp\s*;|\*\s*\w+\s*=\s*t\s*;|\*\s*\w+\s*=\s*tmp\s*;/, msg: "Put the temporary into *b" },
        { re: /swap\s*\(\s*&\s*x\s*,\s*&\s*y\s*\)/, msg: "Call swap(&x, &y)" },
        { re: /printf\s*\([^;]*x[^;]*y\s*\)/, msg: "Print x and y" },
      ],
      solution: md`#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 3, y = 7;
    swap(&x, &y);
    printf("x = %d, y = %d\n", x, y);
    return 0;
}`,
    },
  },
  {
    id: "c9",
    title: "Dynamic Memory Allocation",
    summary: "malloc, calloc, realloc, free and avoiding memory bugs.",
    lessons: [
      {
        title: "malloc and free",
        minutes: 15,
        body: md`Arrays declared normally live on the **stack** with a fixed size. For sizes known only at runtime, allocate on the **heap**.
~~~c
#include <stdlib.h>

int n;
scanf("%d", &n);
int *arr = malloc(n * sizeof *arr);
if (arr == NULL) {
    printf("Out of memory\n");
    return 1;
}
for (int i = 0; i < n; i++) arr[i] = i * i;

free(arr);      // give the memory back
arr = NULL;     // avoid a dangling pointer
~~~
- «malloc(bytes)» returns uninitialised memory or «NULL» on failure.
- Every «malloc» needs exactly one matching «free».`,
      },
      {
        title: "calloc and realloc",
        minutes: 15,
        body: md`### calloc — allocate and zero
~~~c
int *scores = calloc(50, sizeof *scores);   // 50 ints, all 0
~~~

### realloc — grow or shrink
~~~c
int capacity = 4, count = 0;
int *items = malloc(capacity * sizeof *items);

/* when full, double the capacity */
if (count == capacity) {
    capacity *= 2;
    int *tmp = realloc(items, capacity * sizeof *items);
    if (tmp == NULL) { free(items); return 1; }
    items = tmp;
}
~~~
> Always assign «realloc»'s result to a temporary first. If it fails it returns NULL — and overwriting your only pointer would leak the original block.`,
      },
      {
        title: "Common memory bugs",
        minutes: 15,
        body: md`- **Memory leak** — forgetting «free»; long-running programs slowly eat RAM.
- **Dangling pointer** — using memory after «free».
- **Double free** — calling «free» twice on the same pointer.
- **Buffer overflow** — writing past the end of an allocation.
- **Uninitialised read** — using malloc'd memory before setting it.

~~~c
char *s = malloc(5);
strcpy(s, "Journify");   // overflow! needs 9 bytes
free(s);
printf("%s", s);         // use after free!
~~~

### Tools that catch them
- **Valgrind**: «valgrind --leak-check=full ./app»
- **AddressSanitizer**: compile with «gcc -fsanitize=address -g app.c»

> Rule of thumb: whoever allocates is responsible for freeing — document who owns each pointer.`,
      },
    ],
    quiz: [
      { q: "Which function allocates zero-initialised memory?", options: ["malloc", "calloc", "realloc", "alloca"], answer: 1, explain: "calloc zeroes the memory." },
      { q: "What does malloc return when it fails?", options: ["0 bytes", "NULL", "-1", "It exits the program"], answer: 1, explain: "Always check for NULL." },
      { q: "What is a memory leak?", options: ["Reading freed memory", "Allocated memory that is never freed", "A stack overflow", "Writing to NULL"], answer: 1, explain: "Leaked memory stays reserved until the program ends." },
      { q: "Why store realloc's result in a temporary pointer?", options: ["It's faster", "If it fails, you don't lose the original pointer", "realloc requires it", "To zero memory"], answer: 1, explain: "On failure the original block is still valid and must be freed." },
      { q: "Which header declares malloc and free?", options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<memory.h>"], answer: 1, explain: "Memory allocation functions are in stdlib.h." },
    ],
    challenge: {
      title: "Dynamic array",
      prompt: md`Read «n» with scanf, allocate an int array of size «n» with **malloc**, check for **NULL**, fill it with the squares «0, 1, 4, 9 …», print them, and **free** the memory.`,
      starter: md`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;

    return 0;
}`,
      rules: [
        { re: /#include\s*<stdlib\.h>/, msg: "Include <stdlib.h>" },
        { re: /scanf\s*\(\s*"%d"\s*,\s*&n\s*\)/, msg: 'Read n with scanf("%d", &n)' },
        { re: /malloc\s*\(\s*n\s*\*\s*sizeof|malloc\s*\(\s*sizeof\s*\(\s*int\s*\)\s*\*\s*n/, msg: "Allocate with malloc(n * sizeof(int))" },
        { re: /if\s*\(\s*(\w+\s*==\s*NULL|!\s*\w+)\s*\)/, msg: "Check whether malloc returned NULL" },
        { re: /\w+\s*\[\s*\w+\s*\]\s*=\s*\w+\s*\*\s*\w+/, msg: "Fill with arr[i] = i * i" },
        { re: /free\s*\(\s*\w+\s*\)/, msg: "Free the memory with free()" },
      ],
      solution: md`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int *arr = malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Out of memory\n");
        return 1;
    }
    for (int i = 0; i < n; i++) {
        arr[i] = i * i;
        printf("%d ", arr[i]);
    }
    printf("\n");
    free(arr);
    return 0;
}`,
    },
  },
  {
    id: "c10",
    title: "Structures, Unions & Enums",
    summary: "Group related data with struct, typedef, unions and enums.",
    lessons: [
      {
        title: "Structures",
        minutes: 15,
        body: md`A **struct** groups variables of different types into one record.
~~~c
struct Student {
    char name[50];
    int roll;
    float cgpa;
};

struct Student s1 = {"Divya", 21, 8.9f};
printf("%s %d %.1f\n", s1.name, s1.roll, s1.cgpa);

s1.cgpa = 9.1f;   // access members with the dot operator
~~~

### typedef for shorter names
~~~c
typedef struct {
    char name[50];
    int roll;
} Student;

Student class[60];   // array of structs
~~~`,
      },
      {
        title: "Pointers to structs and nested structs",
        minutes: 15,
        body: md`### The arrow operator
~~~c
Student s = {"Ravi", 7};
Student *p = &s;
printf("%s\n", p->name);    // same as (*p).name
p->roll = 8;
~~~

### Passing structs to functions
Pass a pointer to avoid copying large structs:
~~~c
void printStudent(const Student *st) {
    printf("%s (%d)\n", st->name, st->roll);
}
printStudent(&s);
~~~

### Nested structs
~~~c
typedef struct { int day, month, year; } Date;
typedef struct {
    char name[50];
    Date dob;
} Person;

Person p1 = {"Asha", {15, 8, 2004}};
printf("%d\n", p1.dob.year);
~~~`,
      },
      {
        title: "Unions and enums",
        minutes: 15,
        body: md`### union — members share the same memory
~~~c
union Value {
    int i;
    float f;
    char c;
};
union Value v;
v.i = 65;
printf("%c\n", v.c);   // reading another member reinterprets the bytes
~~~
A union's size equals its **largest** member. Used in embedded systems and protocol parsing to save memory.

### enum — named integer constants
~~~c
enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };   // 0..6
enum Status { PENDING = 1, PAID = 2, FAILED = -1 };

enum Day today = WED;
if (today == WED) printf("Midweek\n");
~~~
Enums make code more readable than magic numbers.`,
      },
    ],
    quiz: [
      { q: "Which operator accesses a member through a struct pointer?", options: [".", "->", "::", "*"], answer: 1, explain: "p->member is shorthand for (*p).member." },
      { q: "What does typedef do?", options: ["Creates a new type alias", "Allocates memory", "Defines a macro", "Declares a variable"], answer: 0, explain: "typedef gives an existing type a new name." },
      { q: "The size of a union is…", options: ["The sum of its members", "The size of its largest member (plus padding)", "Always 4 bytes", "The smallest member"], answer: 1, explain: "Members share the same memory." },
      { q: "In «enum Day { MON, TUE, WED };», what is WED?", options: ["1", "2", "3", "\"WED\""], answer: 1, explain: "Enums start at 0 by default." },
      { q: "Why pass «const Student *» rather than «Student» to a function?", options: ["Required by C", "Avoids copying the struct and prevents modification", "It's the only way to read members", "It makes it global"], answer: 1, explain: "Pointers avoid copies; const protects the data." },
    ],
    challenge: {
      title: "Student records",
      prompt: md`Define a «typedef struct» named «Student» with «char name[50]», «int roll» and «float cgpa». Create an **array of 3** students, then loop through it and print each student's details.`,
      starter: md`#include <stdio.h>

// define Student here

int main(void) {

    return 0;
}`,
      rules: [
        { re: /typedef\s+struct\s*\w*\s*\{/, msg: "Use typedef struct { ... } Student;" },
        { re: /char\s+name\s*\[\s*\d+\s*\]\s*;/, msg: "Add char name[50];" },
        { re: /int\s+roll\s*;/, msg: "Add int roll;" },
        { re: /(float|double)\s+cgpa\s*;/, msg: "Add float cgpa;" },
        { re: /\}\s*Student\s*;/, msg: "Name the type Student" },
        { re: /Student\s+\w+\s*\[\s*3\s*\]/, msg: "Create an array of 3 students: Student list[3]" },
        { re: /for\s*\([\s\S]*\w+\s*\[\s*\w+\s*\]\s*\.\s*name/, msg: "Loop and print list[i].name, roll and cgpa" },
      ],
      solution: md`#include <stdio.h>

typedef struct {
    char name[50];
    int roll;
    float cgpa;
} Student;

int main(void) {
    Student list[3] = {
        {"Asha", 1, 8.7f},
        {"Ravi", 2, 7.9f},
        {"Divya", 3, 9.2f}
    };
    for (int i = 0; i < 3; i++) {
        printf("%d. %s - %.1f\n", list[i].roll, list[i].name, list[i].cgpa);
    }
    return 0;
}`,
    },
  },
  {
    id: "c11",
    title: "File Handling",
    summary: "Read and write text and binary files with stdio.",
    lessons: [
      {
        title: "Opening, writing and closing files",
        minutes: 15,
        body: md`~~~c
FILE *fp = fopen("notes.txt", "w");
if (fp == NULL) {
    perror("Could not open file");
    return 1;
}
fprintf(fp, "Student: %s, Marks: %d\n", "Asha", 91);
fputs("Second line\n", fp);
fclose(fp);
~~~

### Modes
- «"r"» read (file must exist)
- «"w"» write (creates or truncates)
- «"a"» append
- «"r+"», «"w+"», «"a+"» read and write
- add «b» for binary: «"rb"», «"wb"»

> Always check for NULL and always «fclose» — unflushed data may be lost otherwise.`,
      },
      {
        title: "Reading text files",
        minutes: 15,
        body: md`### Line by line with fgets
~~~c
FILE *fp = fopen("notes.txt", "r");
char line[256];
while (fgets(line, sizeof line, fp) != NULL) {
    printf("%s", line);
}
fclose(fp);
~~~

### Formatted reading with fscanf
~~~c
char name[50];
int marks;
while (fscanf(fp, "%49s %d", name, &marks) == 2) {
    printf("%s scored %d\n", name, marks);
}
~~~

### Character by character
~~~c
int ch, count = 0;
while ((ch = fgetc(fp)) != EOF) {
    if (ch == '\n') count++;
}
~~~
«ch» must be an «int» so it can hold «EOF» (usually -1).`,
      },
      {
        title: "Binary files and random access",
        minutes: 15,
        body: md`Binary files store raw bytes — compact and fast for structs.
~~~c
typedef struct { int id; float price; } Item;
Item items[3] = {{1, 9.5f}, {2, 20.0f}, {3, 4.75f}};

FILE *out = fopen("items.dat", "wb");
fwrite(items, sizeof(Item), 3, out);
fclose(out);

Item loaded[3];
FILE *in = fopen("items.dat", "rb");
size_t n = fread(loaded, sizeof(Item), 3, in);
fclose(in);
~~~

### Moving around a file
~~~c
fseek(in, 2 * sizeof(Item), SEEK_SET);   // jump to the 3rd record
long pos = ftell(in);                    // current position
rewind(in);                              // back to the start
~~~`,
      },
    ],
    quiz: [
      { q: "What does fopen return if the file can't be opened?", options: ["0", "NULL", "EOF", "-1"], answer: 1, explain: "Always check the returned FILE * for NULL." },
      { q: "Which mode creates a file or erases an existing one?", options: ["\"r\"", "\"a\"", "\"w\"", "\"r+\""], answer: 2, explain: "\"w\" truncates or creates." },
      { q: "Which function reads a whole line safely?", options: ["gets", "fgets", "scanf(\"%s\")", "getc"], answer: 1, explain: "fgets limits how many characters it reads." },
      { q: "Why should the result of fgetc be stored in an int?", options: ["chars are too slow", "So it can represent EOF", "It's required by C syntax", "To store Unicode"], answer: 1, explain: "EOF is outside the range of unsigned char values." },
      { q: "Which functions read and write binary blocks?", options: ["fprintf / fscanf", "fread / fwrite", "fgets / fputs", "printf / scanf"], answer: 1, explain: "fread and fwrite copy raw bytes." },
    ],
    challenge: {
      title: "Write and read a file",
      prompt: md`Open «"students.txt"» in **write** mode, check for NULL, write two lines with «fprintf», and close it. Then open it in **read** mode and print each line using **fgets** in a loop, and close it again.`,
      starter: md`#include <stdio.h>

int main(void) {

    return 0;
}`,
      rules: [
        { re: /fopen\s*\(\s*"students\.txt"\s*,\s*"w"\s*\)/, msg: 'Open with fopen("students.txt", "w")' },
        { re: /==\s*NULL|!\s*\w+\s*\)/, msg: "Check the FILE pointer for NULL" },
        { re: /fprintf\s*\(\s*\w+\s*,[\s\S]*fprintf\s*\(\s*\w+\s*,/, msg: "Write two lines with fprintf" },
        { re: /fopen\s*\(\s*"students\.txt"\s*,\s*"r"\s*\)/, msg: 'Re-open with fopen("students.txt", "r")' },
        { re: /while\s*\(\s*fgets\s*\(/, msg: "Read lines with while (fgets(...) != NULL)" },
        { re: /fclose\s*\([\s\S]*fclose\s*\(/, msg: "Close the file both times with fclose" },
      ],
      solution: md`#include <stdio.h>

int main(void) {
    FILE *fp = fopen("students.txt", "w");
    if (fp == NULL) {
        perror("open");
        return 1;
    }
    fprintf(fp, "Asha 91\n");
    fprintf(fp, "Ravi 78\n");
    fclose(fp);

    fp = fopen("students.txt", "r");
    if (fp == NULL) {
        perror("open");
        return 1;
    }
    char line[100];
    while (fgets(line, sizeof line, fp) != NULL) {
        printf("%s", line);
    }
    fclose(fp);
    return 0;
}`,
    },
  },
  {
    id: "c12",
    title: "Advanced C",
    summary: "Preprocessor, multi-file programs, command-line arguments and linked lists.",
    lessons: [
      {
        title: "The preprocessor",
        minutes: 15,
        body: md`The preprocessor runs before compilation and works on text.
~~~c
#define PI 3.14159
#define SQUARE(x) ((x) * (x))        // parentheses prevent precedence bugs
#define MAX(a, b) ((a) > (b) ? (a) : (b))

#ifdef DEBUG
    printf("debug: x = %d\n", x);
#endif
~~~
Compile with «gcc -DDEBUG app.c» to enable the debug lines.

### Include guards
Prevent a header from being included twice:
~~~c
#ifndef STUDENT_H
#define STUDENT_H
/* declarations */
#endif
~~~
> Macros don't type-check and evaluate arguments more than once: «SQUARE(i++)» increments twice. Prefer «static inline» functions when possible.`,
      },
      {
        title: "Multi-file programs and command-line arguments",
        minutes: 15,
        body: md`### Splitting code across files
~~~c
/* mathutils.h */
#ifndef MATHUTILS_H
#define MATHUTILS_H
int add(int a, int b);
#endif

/* mathutils.c */
#include "mathutils.h"
int add(int a, int b) { return a + b; }

/* main.c */
#include <stdio.h>
#include "mathutils.h"
int main(void) { printf("%d\n", add(2, 3)); return 0; }
~~~
~~~bash
gcc main.c mathutils.c -o app
~~~
Large projects use a **Makefile** to rebuild only what changed.

### Command-line arguments
~~~c
int main(int argc, char *argv[]) {
    printf("Program: %s\n", argv[0]);
    for (int i = 1; i < argc; i++) {
        printf("Arg %d: %s\n", i, argv[i]);
    }
    return 0;
}
~~~
Run «./app hello 42» → «argc» is 3. Convert numbers with «atoi(argv[2])» or «strtol».`,
      },
      {
        title: "Linked lists",
        minutes: 15,
        body: md`A **linked list** is a chain of nodes allocated on the heap — it can grow without reallocating.
~~~c
typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *push(Node *head, int value) {
    Node *n = malloc(sizeof *n);
    n->data = value;
    n->next = head;
    return n;              // new head
}

void printList(const Node *head) {
    for (const Node *p = head; p != NULL; p = p->next)
        printf("%d -> ", p->data);
    printf("NULL\n");
}

void freeList(Node *head) {
    while (head) {
        Node *next = head->next;
        free(head);
        head = next;
    }
}
~~~
Linked lists, stacks, queues and trees built with structs and pointers are the foundation of **data structures** courses and interviews.`,
      },
    ],
    quiz: [
      { q: "Why wrap macro parameters in parentheses, like «((x) * (x))»?", options: ["Style only", "To avoid operator-precedence bugs", "Required by the compiler", "To make them faster"], answer: 1, explain: "SQUARE(a + 1) would otherwise expand to a + 1 * a + 1." },
      { q: "What do include guards prevent?", options: ["Linking errors from missing files", "A header being included more than once", "Macros from being defined", "Compiler warnings"], answer: 1, explain: "#ifndef/#define/#endif stop duplicate inclusion." },
      { q: "For «./app one two», what is argc?", options: ["2", "3", "1", "0"], answer: 1, explain: "argv[0] is the program name, plus two arguments." },
      { q: "In a singly linked list node, what does «next» store?", options: ["The data", "The address of the next node", "The index", "The list length"], answer: 1, explain: "next points to the following node (or NULL)." },
      { q: "What does «gcc -DDEBUG app.c» do?", options: ["Runs the debugger", "Defines the DEBUG macro during compilation", "Deletes debug code", "Builds a debug executable only on Linux"], answer: 1, explain: "-D defines a preprocessor macro." },
    ],
    challenge: {
      title: "Linked list",
      prompt: md`Define a «Node» struct with «int data» and «struct Node *next». Write «push» that inserts a value at the head using **malloc**, push «3», «2» and «1», print the list as «1 -> 2 -> 3 -> NULL», and free every node.`,
      starter: md`#include <stdio.h>
#include <stdlib.h>

// define Node and push here

int main(void) {

    return 0;
}`,
      rules: [
        { re: /typedef\s+struct\s+Node\s*\{|struct\s+Node\s*\{/, msg: "Define struct Node { ... }" },
        { re: /int\s+data\s*;/, msg: "Add int data;" },
        { re: /struct\s+Node\s*\*\s*next\s*;/, msg: "Add struct Node *next;" },
        { re: /malloc\s*\(\s*sizeof/, msg: "Allocate each node with malloc(sizeof ...)" },
        { re: /->\s*next\s*=\s*\w+/, msg: "Link the new node: n->next = head" },
        { re: /push\s*\([\s\S]*push\s*\([\s\S]*push\s*\(/, msg: "Push three values" },
        { re: /!=\s*NULL|while\s*\(\s*\w+\s*\)/, msg: "Traverse until NULL" },
        { re: /free\s*\(/, msg: "Free the nodes" },
      ],
      solution: md`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *push(Node *head, int value) {
    Node *n = malloc(sizeof(Node));
    n->data = value;
    n->next = head;
    return n;
}

int main(void) {
    Node *head = NULL;
    head = push(head, 3);
    head = push(head, 2);
    head = push(head, 1);

    for (Node *p = head; p != NULL; p = p->next) {
        printf("%d -> ", p->data);
    }
    printf("NULL\n");

    while (head != NULL) {
        Node *next = head->next;
        free(head);
        head = next;
    }
    return 0;
}`,
    },
  },
];

const FINAL_EXAM = [
  { q: "Where does execution of a C program begin?", options: ["The first function", "main()", "start()", "The #include line"], answer: 1, explain: "Every C program starts at main." },
  { q: "What does «printf(\"%d\", 10 / 3);» print?", options: ["3.33", "3", "4", "3.0"], answer: 1, explain: "Integer division." },
  { q: "Which format specifier prints a string?", options: ["%c", "%s", "%d", "%p"], answer: 1, explain: "%s prints a null-terminated string." },
  { q: "What is the value of «!5» in C?", options: ["5", "-5", "0", "1"], answer: 2, explain: "Any non-zero value is true, so its negation is 0." },
  { q: "Which statement prevents fall-through in a switch?", options: ["continue", "break", "return only", "exit"], answer: 1, explain: "break ends the switch." },
  { q: "What is the last element index of «int a[8]»?", options: ["8", "7", "9", "0"], answer: 1, explain: "Indexes run 0 to 7." },
  { q: "What does «strlen(\"Hello\")» return?", options: ["5", "6", "4", "Error"], answer: 0, explain: "strlen excludes the null terminator." },
  { q: "Given «int x = 4; int *p = &x; *p = 9;», what is x?", options: ["4", "9", "The address", "Error"], answer: 1, explain: "Writing through *p changes x." },
  { q: "If p points to a[1], what does p + 1 point to?", options: ["a[1] + 1", "a[2]", "The next byte", "a[0]"], answer: 1, explain: "Pointer arithmetic moves by whole elements." },
  { q: "What should follow every successful malloc?", options: ["realloc", "A matching free when done", "calloc", "Nothing"], answer: 1, explain: "Otherwise memory leaks." },
  { q: "Which operator accesses a struct member through a pointer?", options: [".", "->", "&", "::"], answer: 1, explain: "p->member." },
  { q: "Which call opens a file for appending?", options: ["fopen(f, \"r\")", "fopen(f, \"w\")", "fopen(f, \"a\")", "fopen(f, \"x\")"], answer: 2, explain: "\"a\" appends to the end." },
  { q: "What does a static local variable do?", options: ["Resets every call", "Retains its value between function calls", "Becomes global in all files", "Is stored in a register"], answer: 1, explain: "Its lifetime is the whole program." },
  { q: "What does the preprocessor do with #include?", options: ["Links a library", "Inserts the contents of the header file", "Compiles the header", "Imports a module at runtime"], answer: 1, explain: "#include is textual inclusion." },
  { q: "In «int main(int argc, char *argv[])», what is argv[0]?", options: ["The first user argument", "The program name", "argc", "NULL"], answer: 1, explain: "argv[0] is the program's name or path." },
];

export const C_COURSE = {
  id: "c",
  slug: "c",
  title: "C Programming",
  topics: "C Fundamentals, Control Flow, Arrays and Strings, Functions, Pointers, Dynamic Memory, Structures and File Handling",
  hours: 12,
  passPercent: 70,
  storageKey: "journify.course.c.v1",
  lang: "c",
  fileName: "main.c",
  icon: "C",
  tagline: "Master the language behind operating systems — from printf to pointers and linked lists.",
  modules: MODULES,
  finalExam: FINAL_EXAM,
};
