---
slug: mercedes
title: Lead Frontend Developer
org: Mercedes
orgDescription: Mercedes-Benz AG is a global automobile brand and a division of the German company Daimler AG. The brand is known for luxury vehicles, buses, coaches, and trucks.
orgUrl: 'https://www.mercedes-benz.com/'
orgIconUrl: /projects/mercedes.jpg
start: 2020-01-01
end: 2021-05-31
description: Led the development of an Angular backoffice app for one of the biggest car manufacturers in Germany.
tech: [angular, typescript, openapi, 'Custom Mercedes UI library']
location: Stuttgart, DE
remote: true
---

Wrote a script, that queried GitHub for all OpenAPI microservice specs, linted and merged those and then called the openapi-generator-cli to generate Typescript interfaces and Angular services so the developers didn't have to manually create those themselves.

Introduced Typescripts "strict" flags and Angular's "fullTemplateTypeCheck" and refactored the whole app to be compatible.

Created a generic, reusable datatable component with a corresponding datatable service that encapsulated common logic like editing rows, API queries and UI behavior to make creating new views with a datatable (of which there were a lot) much simpler.
