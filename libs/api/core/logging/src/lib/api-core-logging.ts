import { Logger } from '@nestjs/common';

export function apiCoreLogging(): string {
  return 'api-core-logging';
}


export function Log() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFunction = descriptor.value;
    const functionName = originalFunction.name;

    const object: Record<string, any> = {
      [functionName]: function (...args: any[]) {
        this.logger?.debug?.([propertyKey, 'start'].join(' - '));
        const result = originalFunction.apply(this, args);
        this.logger?.debug?.([propertyKey, 'end'].join(' - '));
        return result;
      }
    }
    descriptor.value = object[functionName];
  };
}
