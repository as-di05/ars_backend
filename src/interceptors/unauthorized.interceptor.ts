import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof UnauthorizedException) {
          return throwError(() => ({
            statusCode: 401,
            message: 'Unauthorized - Token expired or invalid',
            error: 'Unauthorized',
          }));
        }
        return throwError(() => error);
      }),
    );
  }
} 