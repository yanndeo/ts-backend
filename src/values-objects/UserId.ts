
export class UserId { 

    private readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }   

    static create(raw: number): UserId {

        if (! UserId.isValid(raw)) {
            throw new Error("Invalid UserId");
        }

        return new UserId(raw);
    }   

    getValue(): number {
        return this.value;
    }   

    static isValid(id: number): boolean {

        return Number.isInteger(id) && id > 0;
    }


    equals(other: UserId): boolean {
        return this.value === other.getValue();
    }
}