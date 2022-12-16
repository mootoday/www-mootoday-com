
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.copyEmailAddress": { type: "done.invoke.copyEmailAddress"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.copyEmailAddress": { type: "error.platform.copyEmailAddress"; data: unknown };
"xstate.after(1000)#Email.copied": { type: "xstate.after(1000)#Email.copied" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "copyEmailAddress";
        };
        eventsCausingActions: {
          "hideEmailAddress": "error.platform.copyEmailAddress" | "xstate.after(1000)#Email.copied" | "xstate.init";
"showEmailAddress": "SHOW";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "copyEmailAddress": "COPY";
        };
        matchesStates: "copied" | "copying" | "hidden" | "visible";
        tags: never;
      }
  