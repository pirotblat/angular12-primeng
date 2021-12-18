import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { User } from './auth/user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private srvAuth: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.srvAuth.user.pipe(
      take(1),
      exhaustMap(u => {
        console.log(u);
        if (!u) {
          return next.handle(req);
        }
        let token: string ='';
        if(u.token) {
          token=u.token;
        }
        if (token=='') {
          return next.handle(req);
        }

        const tokenReq: HttpRequest<any> = req.clone( {
          setHeaders: {
            Authorization: `Bearer ${ token }`
          }
        } );
        return next.handle( tokenReq );

        // const modifiedRequest = req.clone({
        //   params: new HttpParams().set('auth', token)
        // });
        // return next.handle(modifiedRequest);
      })
    );
  }
}

// const modifiedRequest = req.clone({
//   headers: req.headers.append('Auth', 'xyz')
// });
