// 1. Basic Types and Type Annotations
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let numbers: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 42];

// 2. Interfaces
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;  // Optional property
    readonly createdAt: Date;  // Immutable property
}

// Interface extension
interface Employee extends User {
    department: string;
    salary: number;
}

// 3. Type Aliases and Union Types
type ID = string | number;
type Status = "pending" | "active" | "inactive";

type Theme = {
    primaryColor: string;
    secondaryColor: string;
    fontSize: number;
};

// 4. Generics
interface Repository<T> {
    get(id: string): Promise<T>;
    save(item: T): Promise<void>;
    delete(id: string): Promise<boolean>;
}

class UserRepository implements Repository<User> {
    async get(id: string): Promise<User> {
        // Implementation
        return {} as User;
    }
    
    async save(user: User): Promise<void> {
        // Implementation
    }
    
    async delete(id: string): Promise<boolean> {
        // Implementation
        return true;
    }
}

// 5. Enums
enum Role {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}

// 6. Classes with Access Modifiers
class Account {
    private balance: number;
    protected id: string;
    public owner: string;
    
    constructor(owner: string, initialBalance: number) {
        this.owner = owner;
        this.balance = initialBalance;
        this.id = Math.random().toString(36).substr(2, 9);
    }
    
    public deposit(amount: number): void {
        this.balance += amount;
    }
    
    private validateWithdrawal(amount: number): boolean {
        return this.balance >= amount;
    }
}

// 7. Function Types and Overloads
type Calculator = (x: number, y: number) => number;

interface StringProcessor {
    (input: string): string;
    (input: string[]): string[];
}

// 8. Utility Types
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

// Partial makes all properties optional
type PartialTodo = Partial<Todo>;

// Pick selects specific properties
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit removes specific properties
type TodoWithoutDescription = Omit<Todo, "description">;

// 9. Mapped Types
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

// 10. Type Guards and Type Narrowing
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// 11. Async Function Types
interface AsyncDataLoader {
    loadData(): Promise<User[]>;
    processData(data: User[]): Promise<void>;
}

// 12. Decorators
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with:`, args);
        return originalMethod.apply(this, args);
    };
    
    return descriptor;
}

class Example {
    @log
    greet(name: string) {
        return `Hello, ${name}!`;
    }
}

// 13. Conditional Types
type IsString<T> = T extends string ? true : false;
type IsStringType = IsString<string>; // true
type IsNumberType = IsString<number>; // false

// 14. Index Signatures
interface StringDictionary {
    [key: string]: string;
}

// 15. Template Literal Types
type EventName = `on${Capitalize<string>}`;
type ValidationMessage = `error_${string}` | `warning_${string}`;
