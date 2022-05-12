import { Module } from '@nestjs/common';
import { <%= kebabToPascal(config.name) %>Service } from './services/<%= toLower(config.name) %>.service';
import { <%= kebabToPascal(config.name) %>Controller } from './controllers/index.controller';
<% if (useMongoose) { %>
import { MongooseModule } from '@nestjs/mongoose';
import { <%= kebabToPascal(config.name) %>, <%= kebabToPascal(config.name) %>Schema } from './schemas/<%= toLower(config.name) %>.schema';
<% } %>

@Module({
<% if (useMongoose) { %>
  imports: [MongooseModule.forFeature([{ name: <%= kebabToPascal(config.name) %>.name, schema: <%= kebabToPascal(config.name) %>Schema }])],
<% } %>
  controllers: [<%= kebabToPascal(config.name) %>Controller],
  providers: [<%= kebabToPascal(config.name) %>Service],
})
export class <%= kebabToPascal(config.name) %>Module {}
