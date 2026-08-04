export class SignupEntity {
  constructor(
    public readonly id: string,
    public readonly activityId: string,
    public readonly name: string,
    public readonly createdAt: Date,
  ) {}
}
