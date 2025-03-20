export class HotelDto {
  id: number;
  name: string;
  price: number;
  doingtime: string;
}

export class HotelResponse<Proms> {
  RespCode: number;
  RespMessage: string;
  Result: Proms;
}

export class HotelDashboardResponse<Proms> {
  RespCode: number;
  RespMessage: string;
  Result: {
    Data: Proms;
    Dashboard: {
      AllHotel: number;
      Price: {
        High: string;
        Low: string;
      };
      LastHotelAdd: string;
    };
  };
}
