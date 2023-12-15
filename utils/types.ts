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
    id: number,
    name: string,
    description?: string,
    cone?: string,
    size?: string,
    turnaround?: string,
    price?: string,
    isAvailable?: boolean,
    requests?: Array<Request>,
    expanded?: boolean,
    image: string,
}

export type Request = {
    userId: number;
    status: string;
    username: string;
    reservationId: number;
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

export type UserData = {
    kilnIds: number[],
    reservationIds: number[],
}