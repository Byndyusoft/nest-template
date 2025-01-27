import {
  KafkaConsumerEventPattern,
  KafkaConsumerPayloadDecoder,
  KafkaValue,
} from "@byndyusoft/nest-kafka";
import { HttpService } from "@nestjs/axios";
import { Controller, UseInterceptors } from "@nestjs/common";
import { UserDto } from "open-telemetry-example-dtos";

@Controller()
export class UsersConsumer {
  public constructor(private readonly httpService: HttpService) {}

  @KafkaConsumerEventPattern({
    connectionName: "test",
    topicPicker: (config: { topic: string }) => config.topic,
    fromBeginning: true,
  })
  @UseInterceptors(
    new KafkaConsumerPayloadDecoder({
      value: "json",
    }),
  )
  public async onMessage(@KafkaValue() value: UserDto): Promise<void> {
    console.log(value);
    await this.httpService.axiosRef.get("/api/v1/users/1", {
      baseURL: "http://localhost:8088",
    });
  }
}
