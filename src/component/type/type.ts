export type TicketType = {
    price: number
    carrier: string
    segments: [
      {
        origin: string
        destination: string
        date: string
        stops: string[]
        duration: number
      },
      {
        origin: string
        destination: string
        date: string
        stops: string[]
        duration: number
      }
    ]
  }

export type IState = {
    continuation: boolean,
    checkAll: boolean,
    checkNonStop: boolean,
    checkOne: boolean,
    checkTwo: boolean,
    checkThree: boolean,
    cheapBut: boolean,
    quickBut: boolean,
    optimalBut: boolean,
    keySearch: number,
    arrTicket: TicketType[],
    errors: boolean,
    countTicket: number,
}

export type InputOnChangeType = React.ChangeEventHandler<HTMLInputElement>;
export type FuncType = () => void;