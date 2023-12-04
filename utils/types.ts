export type Address = {
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    isBilling: boolean
}

export type Kiln = {
    name: string,
    description: string,
    cone: string,
    size: string,
    turnaround: string,
    price: string,
}

export type Reservation = {
    reservationId: number,
    kilnId: number,
    kilnName: string,
    userId: number,
    price: string, // tbd
    status: string,
    image: string
}