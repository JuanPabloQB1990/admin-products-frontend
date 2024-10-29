export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-EN', {
        style: "currency",
        currency: "USD"
    }).format(amount)
}

export function toBoolean(str: string) {
    return str.toLocaleLowerCase() === "true"
}