import { AuthModule } from './auth/auth.module';
import { User } from './user/models/user.model';
import { JwtModule } from './extra/jwt/jwt-module';
import { LanguagesModule } from './languages/languages.module';
import { CourseModule } from './course/course.module';
import { Course } from './course/course.model';

export const extraModules = [JwtModule];

export const allModules = [LanguagesModule, AuthModule, CourseModule];

export const allModels = [User, Course];

export const globalModels = [User];
