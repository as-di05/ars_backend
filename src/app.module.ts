// import { Module, OnModuleInit } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { createConnection } from 'mysql2/promise';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { PropertiesModule } from './properties/properties.module';
// import { FavoritesModule } from './favorites/favorites.module';
// import { CategoriesModule } from './categories/categories.module';
// import { databaseConfig, dbConnection } from './db/config';
// import { DatabaseService } from './db/database.service';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
//     // ScheduleModule.forRoot(),
//     AuthModule,
//     UsersModule,
//     PropertiesModule,
//     FavoritesModule,
//     CategoriesModule,
//   ],
//   controllers: [AppController],
//   providers: [
//     AppService,
//     DatabaseService,
//     {
//       provide: 'DATABASE_CONNECTION',
//       useFactory: dbConnection,
//       inject: [ConfigService],
//     },
//   ],
//   exports: ['DATABASE_CONNECTION'],
// })
// export class AppModule implements OnModuleInit {
//   constructor(private readonly databaseService: DatabaseService) {}

//   async onModuleInit() {
//     await this.databaseService.createDatabase();
//   }
// }

import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseService } from './db/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    DatabaseModule, // Импорт DatabaseModule
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    await this.databaseService.createDatabase();
  }
}
