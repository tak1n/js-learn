import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Session based authentication
// import * as session from 'express-session';
// import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Session based authentication
  // app.use(
  //   session({
  //     secret: 'topSecret',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 3600000 },
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
