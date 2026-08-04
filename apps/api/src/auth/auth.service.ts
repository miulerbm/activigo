import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(password: string): { accessToken: string } {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      throw new UnauthorizedException("Contraseña incorrecta");
    }

    const accessToken = this.jwtService.sign({ role: "admin" });
    return { accessToken };
  }
}
