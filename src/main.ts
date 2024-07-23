import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AuthEnum } from './auth/enum/auth.enum';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('스웨거')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addCookieAuth(AuthEnum.ACCESS_TOKEN)
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [PostModule, UsersModule],
  });
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      tagsSorter: 'alpha',
    },
  });

  await app.listen(3000);
}
bootstrap();
