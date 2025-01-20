export class ApiResponseDto<T = any> {
  id?: number;
  status: boolean;
  message?: string;
  data?: T;

  constructor(status: boolean, message?: string, data?: T, id?: number) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.id = id;
  }
}

export interface ApiResponse<T = any> {
  id?: number;
  status: boolean;
  message?: string;
  data?: T;
}
