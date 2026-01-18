
export class Email {

    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }


    static create(raw: string): Email {
        const normalized = raw.trim().toLowerCase();

        if (! Email.isValid(normalized)) {
            throw new Error("Invalid email");
        }

        return new Email(normalized);
    }


    getValue(): string {
        return this.value;
    }


    static isValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }
}