import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LanguageCheatSheet() {
  const [showURL, setShowURL] = useState(false);
  const [playURL, setPlayURL] = useState("");

  const sections = [
    { key: "basics", label: "Basics" },
    { key: "datatypes", label: "Datatypes" },
    { key: "visibility", label: "Visibility" },
    { key: "functions", label: "Functions" },
    { key: "objects", label: "Objects" },
    { key: "interfaces", label: "Interfaces" },
    { key: "gof", label: "GoF" },
    { key: "errors", label: "Errors" },
    { key: "concurrency", label: "Concurrency" },
  ];

  const examples = {
    basics: {
      java: `public class Main {\n    public static void main(String[] args) {\n        int a = 10;\n        String s = \"hi\";\n        System.out.println(a + \" \" + s);\n        for (int i = 0; i < 5; i++) {\n            System.out.println(i);\n        }\n    }\n}`,
      kotlin: `fun main() {\n    val a = 10\n    val s = \"hi\"\n    println(\"$a $s\")\n    for (i in 0..4) {\n        println(i)\n    }\n}`,
      python: `a = 10\ns = 'hi'\nprint(a, s)\nfor i in range(5):\n    print(i)` ,
      go: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    a := 10\n    s := \"hi\"\n    fmt.Println(a, s)\n    for i := 0; i < 5; i++ {\n        fmt.Println(i)\n    }\n}`,
      typescript: `let a: number = 10;\nconst s: string = \"hi\";\nconsole.log(a, s);\nfor (let i = 0; i < 5; i++) {\n    console.log(i);\n}`,
    },

    datatypes: {
      java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Primitives with explicit init (defaults shown in comments for fields)\n        int i = 0;          // default for fields: 0\n        double d = 0.0;     // default: 0.0\n        boolean b = false;  // default: false\n        char c = '\\u0000'; // default: null char\n\n        // Reference types\n        String s = null;    // default: null\n\n        // Arrays, Lists, Maps\n        int[] nums = {1, 2, 3};\n        for (int n : nums) System.out.println(n);\n\n        List<String> list = new ArrayList<>(List.of(\"Alice\", \"Bob\"));\n        list.forEach(System.out::println);\n\n        Map<String, Integer> ages = new HashMap<>();\n        ages.put(\"Alice\", 25); ages.put(\"Bob\", 30);\n        ages.forEach((k,v) -> System.out.println(k + \" => \" + v));\n    }\n}`,
      kotlin: `fun main() {\n    // Kotlin types: Int, Double, Boolean, Char, String\n    // Non-nullable by default, use ? for nullable\n    var i: Int = 0\n    var d: Double = 0.0\n    var b: Boolean = false\n    var c: Char = '\\u0000'\n    var s: String? = null  // nullable type\n\n    println(\"$i $d $b $c $s\")\n\n    // Collections: List, MutableList, Map, MutableMap\n    val nums = listOf(1, 2, 3)\n    nums.forEach { println(it) }\n\n    val names = mutableListOf(\"Alice\", \"Bob\")\n    names.add(\"Charlie\")\n    names.forEach { println(it) }\n\n    val ages = mutableMapOf(\"Alice\" to 25, \"Bob\" to 30)\n    ages[\"Charlie\"] = 28\n    ages.forEach { (k, v) -> println(\"$k => $v\") }\n\n    // Functional example\n    val adults = ages.filter { it.value >= 28 }\n    println(\"Filtered: $adults\")\n}`,
      python: `# Python datatypes and collections\nnums = [1, 2, 3]\nfor n in nums:\n    print(n)\npeople = ['Alice', 'Bob']\nfor name in people:\n    print(name)\nages = {'Alice': 25, 'Bob': 30}\nfor k, v in ages.items():\n    print(f\"{k} => {v}\")\n# Functional example\nadults = {k: v for k, v in ages.items() if v >= 28}\nprint('Filtered:', adults)` ,
      go: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Zero values (defaults) in Go when declared with 'var'\n    var i int        // 0\n    var f float64    // 0\n    var b bool       // false\n    var c rune       // 0 (null rune)\n    var s string     // \"\"\n\n    fmt.Println(i, f, b, c, s)\n\n    // Collections\n    nums := [3]int{1, 2, 3}           // array (fixed size)\n    for _, n := range nums { fmt.Println(n) }\n\n    names := []string{\"Alice\", \"Bob\"} // slice (dynamic)\n    names = append(names, \"Charlie\")\n    for _, name := range names { fmt.Println(name) }\n\n    ages := map[string]int{\"Alice\": 25, \"Bob\": 30}\n    ages[\"Charlie\"] = 28\n    for k, v := range ages { fmt.Printf(\"%s => %d\\n\", k, v) }\n}`,
      typescript: `// TypeScript datatypes and collections\n// Primitives: number, string, boolean, null, undefined\nlet i: number = 0;\nlet d: number = 0.0;\nlet b: boolean = false;\nlet s: string | null = null;  // union type for nullable\n\nconsole.log(i, d, b, s);\n\n// Arrays and collections\nconst nums: number[] = [1, 2, 3];\nnums.forEach(n => console.log(n));\n\nconst names: string[] = [\"Alice\", \"Bob\"];\nnames.push(\"Charlie\");\nnames.forEach(name => console.log(name));\n\n// Map (key-value pairs)\nconst ages = new Map<string, number>([\n    [\"Alice\", 25],\n    [\"Bob\", 30]\n]);\nages.set(\"Charlie\", 28);\nages.forEach((v, k) => console.log(\`\${k} => \${v}\`));\n\n// Functional example\nconst ageArray = Array.from(ages.entries());\nconst adults = ageArray.filter(([k, v]) => v >= 28);\nconsole.log('Filtered:', adults);`,
    },

    visibility: {
      java: `class Utils {\n    public static String PUBLIC_VAR = \"I'm public!\";\n    private static String PRIVATE_VAR = \"I'm private!\";\n    public static void printPrivate() { System.out.println(PRIVATE_VAR); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(Utils.PUBLIC_VAR);\n        Utils.printPrivate();\n    }\n}`,
      kotlin: `// ========================\n//  VISIBILITY IN KOTLIN\n// ========================\n// - public: visible everywhere (default for top-level)\n// - private: visible only in the same file/class\n// - internal: visible within the same module\n// - protected: visible in subclasses\n\nobject Utils {\n    const val PUBLIC_VAR = \"I'm public!\"\n    private const val PRIVATE_VAR = \"I'm private!\"\n    fun printPrivate() { println(PRIVATE_VAR) }\n}\n\nclass User(val name: String, private val age: Int) {\n    fun showName() { println(\"Name: $name\") }\n    private fun showAge() { println(\"Age: $age\") }\n}\n\nfun main() {\n    println(Utils.PUBLIC_VAR)\n    Utils.printPrivate()\n\n    val u = User(\"Alice\", 30)\n    println(u.name)  // OK (public)\n    // println(u.age) // ❌ cannot access private property\n    u.showName()\n    // u.showAge()    // ❌ cannot call private method\n}`,
      python: `class Utils:\n    PUBLIC_VAR = \"I'm public!\"\n    __PRIVATE_VAR = \"I'm private!\"  # name-mangled (convention)\n    @staticmethod\n    def print_private():\n        print(Utils.__PRIVATE_VAR)\n\nprint(Utils.PUBLIC_VAR)\nUtils.print_private()` ,
      go: `package main\n\nimport \"fmt\"\n\n// ========================\n//  VISIBILITY IN GO\n// ========================\n// - Identifiers starting with uppercase letters are exported (public).\n// - Lowercase identifiers are unexported (private) to the package.\n// - Applies to variables, constants, functions, structs, and fields.\n\n// Package-level variables\nvar PublicVar = \"I'm public!\"\nvar privateVar = \"I'm private!\"\n\n// Functions\nfunc PrintPrivate() { fmt.Println(privateVar) } // Exported\nfunc printHidden() { fmt.Println(\"hidden function\") } // Unexported\n\n// Structs and Fields\ntype User struct {\n    Name string   // exported field\n    age  int      // unexported field\n}\n\nfunc (u User) ShowName() { fmt.Println(\"Name:\", u.Name) }\nfunc (u User) showAge() { fmt.Println(\"Age:\", u.age) }\n\nfunc main() {\n    fmt.Println(PublicVar)\n    PrintPrivate()\n\n    // Accessing struct fields\n    u := User{Name: \"Alice\", age: 30}\n    fmt.Println(u.Name) // OK (public)\n    // fmt.Println(u.age) // ❌ cannot access unexported field\n    u.ShowName()\n    // u.showAge() // ❌ cannot call unexported method outside package\n}`,
      typescript: `// ========================\n//  VISIBILITY IN TYPESCRIPT\n// ========================\n// - public: accessible everywhere (default)\n// - private: only within the class\n// - protected: within class and subclasses\n// - readonly: cannot be modified after initialization\n\nclass Utils {\n    public static readonly PUBLIC_VAR = \"I'm public!\";\n    private static readonly PRIVATE_VAR = \"I'm private!\";\n    \n    public static printPrivate() {\n        console.log(Utils.PRIVATE_VAR);\n    }\n}\n\nclass User {\n    constructor(\n        public name: string,\n        private age: number\n    ) {}\n    \n    showName() { console.log(\`Name: \${this.name}\`); }\n    private showAge() { console.log(\`Age: \${this.age}\`); }\n}\n\nconsole.log(Utils.PUBLIC_VAR);\nUtils.printPrivate();\n\nconst u = new User(\"Alice\", 30);\nconsole.log(u.name);  // OK (public)\n// console.log(u.age);  // ❌ cannot access private property\nu.showName();\n// u.showAge();  // ❌ cannot call private method`,
    },

    functions: {
      java: `import java.util.function.Function;\n\n// Basics + overloading (default-like) + lambda & closure\nclass Main {\n    static int add(int a, int b) { return a + b; }\n    static int add(int a) { return add(a, 10); } // default via overload\n\n    public static void main(String[] args) {\n        System.out.println(add(5));\n        System.out.println(add(5, 3));\n\n        Runnable r = () -> System.out.println(\"Lambda!\");\n        r.run();\n\n        int base = 10;\n        Function<Integer,Integer> adder = x -> x + base; // closure\n        System.out.println(adder.apply(5));\n    }\n}`,
      kotlin: `// Functions with default parameters, lambdas, and closures\nfun add(a: Int, b: Int = 10): Int = a + b\n\nfun makeAdder(base: Int): (Int) -> Int {\n    return { x -> x + base }  // closure\n}\n\nfun main() {\n    println(add(5))         // uses default b=10\n    println(add(5, 3))\n\n    // Lambda\n    val r: () -> Unit = { println(\"Lambda!\") }\n    r()\n\n    // Closure\n    val add5 = makeAdder(5)\n    println(add5(10))\n\n    // Anonymous function\n    val greet = { name: String -> println(\"Hello, $name\") }\n    greet(\"Kotlin Dev\")\n}`,
      python: `# Defaults, lambda, closures\ndef add(a, b=10):\n    return a + b\n\nprint(add(5))\nprint(add(5, 3))\n\n# Lambdas\nprint((lambda x, y=10: x + y)(5))\n\n# Closure\ndef make_adder(base):\n    def adder(x):\n        return x + base\n    return adder\n\nadd5 = make_adder(5)\nprint(add5(10))` ,
      go: `package main\n\nimport \"fmt\"\n\nfunc add(a int, b int) int { return a + b }\nfunc addDefault(a int) int { return add(a, 10) } // simulate default\n\n// Closure maker\nfunc makeAdder(base int) func(int) int {\n    return func(x int) int { return x + base }\n}\n\nfunc main() {\n    fmt.Println(addDefault(5))\n    fmt.Println(add(5, 3))\n\n    greet := func(name string) { fmt.Println(\"Hello,\", name) } // anon func\n    greet(\"Go Dev\")\n\n    add5 := makeAdder(5)\n    fmt.Println(add5(10))\n}`,
      typescript: `// Functions with default parameters, arrow functions, and closures\nfunction add(a: number, b: number = 10): number {\n    return a + b;\n}\n\nconsole.log(add(5));         // uses default b=10\nconsole.log(add(5, 3));\n\n// Arrow function (lambda)\nconst r = () => console.log(\"Lambda!\");\nr();\n\n// Closure\nfunction makeAdder(base: number): (x: number) => number {\n    return (x: number) => x + base;\n}\n\nconst add5 = makeAdder(5);\nconsole.log(add5(10));\n\n// Anonymous function\nconst greet = (name: string) => console.log(\`Hello, \${name}\`);\ngreet(\"TypeScript Dev\");`,
    },

    objects: {
      java: `class Person { String name; int age; void greet() { System.out.println(\"Hi, I'm \" + name); } }\nclass Main { public static void main(String[] args){ Person p = new Person(); p.name=\"Alice\"; p.age=30; p.greet(); } }`,
      kotlin: `// Data class with constructor and methods\ndata class Person(val name: String, val age: Int) {\n    fun greet() { println(\"Hi, my name is $name\") }\n}\n\nfun main() {\n    Person(\"Alice\", 30).greet()\n}`,
      python: `class Person:\n    def __init__(self, name, age):\n        self.name = name; self.age = age\n    def greet(self):\n        print(f\"Hi, my name is {self.name}\")\n\nPerson('Alice', 30).greet()` ,
      go: `package main\n\nimport \"fmt\"\n\n// Struct + method (receiver)\ntype Person struct { Name string; Age int }\nfunc (p Person) Greet() { fmt.Println(\"Hi, my name is\", p.Name) }\n\nfunc main() { Person{Name: \"Alice\", Age: 30}.Greet() }`,
      typescript: `// Class with constructor and methods\nclass Person {\n    name: string;\n    age: number;\n    \n    constructor(name: string, age: number) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    greet() {\n        console.log(\`Hi, my name is \${this.name}\`);\n    }\n}\n\nnew Person(\"Alice\", 30).greet();`,
    },

    interfaces: {
      java: `interface Animal { void speak(); }\nclass Dog implements Animal { public void speak(){ System.out.println(\"Woof\"); } }\nclass Main { public static void main(String[] args){ Animal a = new Dog(); a.speak(); } }`,
      kotlin: `// Interfaces in Kotlin\ninterface Animal {\n    fun speak()\n}\n\nclass Dog : Animal {\n    override fun speak() { println(\"Woof\") }\n}\n\nfun main() {\n    val a: Animal = Dog()\n    a.speak()\n}`,
      python: `from abc import ABC, abstractmethod\nclass Animal(ABC):\n    @abstractmethod\n    def speak(self): ...\nclass Dog(Animal):\n    def speak(self): print('Woof')\nDog().speak()` ,
      go: `package main\n\nimport \"fmt\"\n\ntype Animal interface { Speak() }\ntype Dog struct{}\nfunc (d Dog) Speak(){ fmt.Println(\"Woof!\") }\nfunc main(){ var a Animal = Dog{}; a.Speak() }`,
      typescript: `// Interfaces in TypeScript\ninterface Animal {\n    speak(): void;\n}\n\nclass Dog implements Animal {\n    speak() {\n        console.log(\"Woof\");\n    }\n}\n\nconst a: Animal = new Dog();\na.speak();`,
    },

    gof: {
      java: `// Strategy (simplified)\ninterface PaymentStrategy { void pay(int amount); }\nclass CreditCard implements PaymentStrategy { public void pay(int a){ System.out.println(\"Paid \"+a+\" by card\"); } }\nclass Main { public static void main(String[] args){ new CreditCard().pay(50); } }`,
      kotlin: `// Strategy pattern in Kotlin\ninterface PaymentStrategy {\n    fun pay(amount: Int)\n}\n\nclass CreditCard : PaymentStrategy {\n    override fun pay(amount: Int) {\n        println(\"Paid $amount by card\")\n    }\n}\n\nfun main() {\n    CreditCard().pay(50)\n}`,
      python: `class PaymentStrategy:\n    def pay(self, amount): ...\nclass CreditCard(PaymentStrategy):\n    def pay(self, amount): print(f'Paid {amount} by card')\nCreditCard().pay(50)` ,
      go: `package main\n\nimport \"fmt\"\n\ntype PaymentStrategy interface{ Pay(int) }\ntype CreditCard struct{}\nfunc (c CreditCard) Pay(a int){ fmt.Println(\"Paid\", a, \"by card\") }\nfunc main(){ CreditCard{}.Pay(50) }`,
      typescript: `// Strategy pattern in TypeScript\ninterface PaymentStrategy {\n    pay(amount: number): void;\n}\n\nclass CreditCard implements PaymentStrategy {\n    pay(amount: number) {\n        console.log(\`Paid \${amount} by card\`);\n    }\n}\n\nnew CreditCard().pay(50);`,
    },

    errors: {
      java: `class Main {\n    static void risky() throws Exception { throw new Exception(\"oops\"); }\n    public static void main(String[] args){\n        try { risky(); } catch (Exception e) { System.out.println(e.getMessage()); }\n    }\n}`,
      kotlin: `// Error handling in Kotlin\nfun risky(): String {\n    throw Exception(\"oops\")\n}\n\n// Using Result type for more functional approach\nfun riskyResult(): Result<String> {\n    return Result.failure(Exception(\"oops\"))\n}\n\nfun main() {\n    // Traditional try-catch\n    try {\n        risky()\n    } catch (e: Exception) {\n        println(e.message)\n    }\n\n    // Result-based approach\n    riskyResult().onFailure { println(it.message) }\n}`,
      python: `try:\n    raise Exception('oops')\nexcept Exception as e:\n    print(e)` ,
      go: `package main\n\nimport (\n  \"errors\"\n  \"fmt\"\n)\n\nfunc risky() (string, error) { return \"\", errors.New(\"oops\") }\n\nfunc main(){\n  v, err := risky()\n  if err != nil { fmt.Println(err); return }\n  fmt.Println(v)\n}`,
      typescript: `// Error handling in TypeScript\nfunction risky(): string {\n    throw new Error(\"oops\");\n}\n\ntry {\n    risky();\n} catch (e) {\n    if (e instanceof Error) {\n        console.log(e.message);\n    }\n}\n\n// Result type pattern (functional approach)\ntype Result<T, E = Error> = \n    | { ok: true; value: T }\n    | { ok: false; error: E };\n\nfunction riskyResult(): Result<string> {\n    return { ok: false, error: new Error(\"oops\") };\n}\n\nconst result = riskyResult();\nif (!result.ok) {\n    console.log(result.error.message);\n}`,
    },

    concurrency: {
      java: `class Main { public static void main(String[] args){ new Thread(() -> System.out.println(\"Hello\")).start(); } }`,
      kotlin: `// Concurrency in Kotlin with coroutines\nimport kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    // Launch a coroutine\n    launch {\n        println(\"Hello from coroutine\")\n    }\n\n    // Traditional thread\n    Thread { println(\"Hello from thread\") }.start()\n\n    delay(100)  // wait for coroutine to complete\n}`,
      python: `import threading\nthreading.Thread(target=lambda: print('Hello')).start()` ,
      go: `package main\n\nimport (\n  \"fmt\"\n  \"time\"\n)\nfunc main(){ go func(){ fmt.Println(\"Hello\") }(); time.Sleep(time.Second) }`,
      typescript: `// Concurrency in TypeScript with async/await and Promises\n// Async function example\nasync function delay(ms: number): Promise<void> {\n    return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nasync function main() {\n    console.log(\"Start\");\n    \n    // Promise-based concurrency\n    Promise.resolve().then(() => console.log(\"Hello from Promise\"));\n    \n    // Async/await\n    await delay(100);\n    console.log(\"After delay\");\n}\n\nmain();\n\n// Worker threads (Node.js)\n// import { Worker } from 'worker_threads';\n// new Worker('./worker.js');`,
    },
  };

  const openPlayground = (code, lang) => {
    const encoded = encodeURIComponent(code);
    let url = "";
    if (lang === 'go') {
      url = `https://go.dev/play/?q=${encoded}`;
    } else if (lang === 'python') {
      url = `https://pythontutor.com/visualize.html#mode=edit&code=${encoded}`;
    } else if (lang === 'kotlin') {
      url = `https://play.kotlinlang.org/#code=${encoded}`;
    } else if (lang === 'typescript') {
      url = `https://www.typescriptlang.org/play/?#code/${btoa(code)}`;
    }
    setPlayURL(url);
    setShowURL(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-center">
        ☕ Java → 🎯 Kotlin → 🐹 Go → 🐍 Python → 💙 TypeScript: Cross‑Language Cheat Sheet
      </motion.h1>

      <Tabs defaultValue="basics">
        <TabsList className="flex justify-center flex-wrap gap-2">
          {sections.map((s) => (
            <TabsTrigger key={s.key} value={s.key}>{s.label}</TabsTrigger>
          ))}
        </TabsList>

        {sections.map((s) => (
          <TabsContent key={s.key} value={s.key}>
            {examples[s.key] ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex flex-col gap-6 mt-4">
                  {['java','kotlin','go','python','typescript'].map((lang) => (
                    <Card key={lang} className="shadow-md relative">
                      <CardContent className={`p-4 rounded-xl ${lang==='java'?'bg-gray-900 text-gray-100':lang==='kotlin'?'bg-purple-900 text-purple-100':lang==='go'?'bg-green-900 text-green-100':lang==='python'?'bg-yellow-900 text-yellow-100':'bg-blue-900 text-blue-100'}`}>
                        <h3 className="font-semibold mb-2 text-lg flex justify-between items-center">
                          <span>{lang.charAt(0).toUpperCase()+lang.slice(1)}</span>
                          {(lang==='go' || lang==='python' || lang==='kotlin' || lang==='typescript') && examples[s.key][lang] && (
                            <Button size="sm" variant="secondary" onClick={() => openPlayground(examples[s.key][lang], lang)}>
                              Playground URL
                            </Button>
                          )}
                        </h3>
                        <pre className="text-sm whitespace-pre-wrap">{examples[s.key][lang]}</pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ) : (
              <p className="text-center text-gray-500 mt-6">Example coming soon...</p>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {showURL && (
        <div className="bg-gray-100 p-4 rounded-xl shadow-md space-y-2">
          <p className="font-semibold">Copy this URL and paste it in your browser:</p>
          <textarea
            readOnly
            value={playURL}
            className="w-full p-2 text-sm rounded-md border border-gray-300 bg-white text-gray-800"
            rows={2}
            onFocus={(e) => e.target.select()}
          />
        </div>
      )}

      <div className="text-center">
        <Button variant="outline" onClick={() => window.open('https://go.dev/tour', '_blank')}>
          Learn More at Tour of Go
        </Button>
      </div>
    </div>
  );
}
