<h1>XML to JSON Vehicle Service</h1>

<p>
  This project is a service that parses XML data from the NHTSA vehicle API, 
  transforms it into JSON format, and stores it in a MongoDB database. 
  The service is built with <strong>NestJS</strong> and uses <strong>GraphQL</strong> 
  to expose the data.
</p>

<h2>Features</h2>
<ul>
  <li>Fetches all vehicle manufacturers from the NHTSA public API.</li>
  <li>Retrieves vehicle types by manufacturer.</li>
  <li>Stores manufacturer and vehicle type data in MongoDB.</li>
  <li>Exposes data via GraphQL to retrieve manufacturers and vehicle types.</li>
  <li>Transforms XML data to JSON format.</li>
</ul>

<h2>Project Structure</h2>
<pre>
xml-json-service/
├── src/
|   ├── schemas/
│   |      └── vehicle-make.schema.ts
│   ├──── utils/
│   │       └── xml-parser.util.ts
│   │   
│   └── vehicle/
│       ├── dto/
│       │   └── vehicle.dto.ts
|       ├── vehicle.resolver.ts
│       ├── vehicle.controller.ts
│       ├── vehicle.module.ts
│       └── vehicle.service.ts
|       └── vehicle.service.spec.ts
│       
├── Dockerfile
├── .dockerignore
├── .env
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
</pre>

<h2>Installation</h2>
<pre>
# Clone the repository
git clone https://github.com/your-username/xml-json-service.git

# Install dependencies

npm install

# Set up environment variables

cp .env.example .env

# Run the development server

npm run start:dev

</pre>

<h2>GraphQL Playground</h2>
<p>
  Once the server is running, you can access the GraphQL Playground at:
  <code>http://localhost:3000/graphql</code>
</p>

<h2>Usage</h2>
<pre>
# Sample GraphQL query to save all vehicle manufacturers to database
{
  createVehicleInfo {
    makeId
    makeName
    VehicleTypes {
      typeId
      typeName
    }
  }
}
</pre>
<pre>
# Sample GraphQL query to fetch all vehicle manufacturers
{
  getData {
    makeId
    makeName
    VehicleTypes {
      typeId
      typeName
    }
  }
}
</pre>

<h2>Testing</h2>
<pre>
# Run unit tests
npm run test
</pre>

<h2>License</h2>
<p>
  This project is licensed under the MIT License.
</p>
