import { Injectable } from "@nestjs/common";
import { ConsoleService } from "nestjs-console";

@Injectable()
export class MyService {
  public constructor(private readonly consoleService: ConsoleService) {
    // get the root cli
    const cli = this.consoleService.getCli();

    // create a single command (See [npm commander arguments/options for more details])

    this.consoleService.createCommand(
      {
        command: "list <directory>",
        description: "description",
      },
      this.listContent,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      cli, // attach the command to the cli
    );

    // create a parent command container
    const groupCommand = this.consoleService.createGroupCommand(
      {
        command: "new",
        description: "A command to create an item",
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      cli, // attach the command to the root cli
    );

    // create command
    this.consoleService.createCommand(
      {
        command: "file <name>",
        description: "Create a file",
      },
      this.createFile,
      groupCommand, // attach the command to the group
    );

    // create another sub command
    this.consoleService.createCommand(
      {
        command: "directory <name>",
        description: "Create a directory",
      },
      this.createDirectory,
      groupCommand, // attach the command to the group
    );
  }

  public listContent = async (
    directory: string,
    // eslint-disable-next-line @typescript-eslint/require-await
  ): Promise<void | Promise<void>> => {
    // eslint-disable-next-line no-console
    console.log(`Listing files in directory ${directory}`);
    // your code...
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering,@typescript-eslint/require-await
  public createFile = async (name: string): Promise<void | Promise<void>> => {
    // eslint-disable-next-line no-console
    console.log(`Creating a file named ${name}`);
    // your code...
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public createDirectory = async (
    name: string,
    // eslint-disable-next-line @typescript-eslint/require-await
  ): Promise<void | Promise<void>> => {
    // eslint-disable-next-line no-console
    console.log(`Creating a directory named ${name}`);
    // your code...
  };
}
