# Message Translator

A message translator is a specialized filter that can be used between other filters or applications to translate one data format into another.

## Levels of Transformation

### Transport Layer
Responsible for complete and reliable data transfer across different network segments. It handles lost data packets and other network errors.

### Data Representation Layer
Also referred to as the "syntax layer," this layer defines the representation of transported data. To interface systems with different data representations, data may need to be decrypted, uncompressed, and parsed. Subsequently, the new data format is rendered, and possibly compressed and encrypted as well.

### Data Type Layer
Defines the application data types that the application (domain) model is based on. This layer addresses decisions such as whether date fields are represented as strings or native date structures, whether dates include a time-of-day component, and which time zone they are based on.

### Data Structures
Describes the data at the level of the application domain model, often referred to as the Application Layer. This layer defines the logical entities the application deals with, such as Customer, Address, or Account.
