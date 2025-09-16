# Sheets Schema Documentation

This document provides a comprehensive schema reference for the three main data entities in the SFA Phase 6 system: Sessions, Jobs, and Control.

**Note**: Only headers and first example rows are shown for brevity.

## Sessions Schema

The Sessions table tracks individual data collection sessions with their associated metadata and results.

### Columns

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Unique session identifier |
| session_name | TEXT | Human-readable session name |
| created_at | TIMESTAMP | Session creation timestamp |
| status | TEXT | Current session status (pending/running/completed/failed) |
| source_type | TEXT | Type of data source (api/file/manual) |
| config_json | JSON | Session configuration parameters |
| results_json | JSON | Session execution results |
| metadata_json | JSON | Additional session metadata |

### JSON Field Types

#### config_json Structure
```json
{
  "data_source": "string",
  "collection_method": "string",
  "parameters": {
    "param1": "value1",
    "param2": "value2"
  },
  "filters": [
    {
      "field": "string",
      "operator": "string",
      "value": "any"
    }
  ]
}
```

#### results_json Structure
```json
{
  "total_records": "number",
  "processed_records": "number",
  "success_count": "number",
  "error_count": "number",
  "execution_time_ms": "number",
  "output_files": [
    {
      "filename": "string",
      "path": "string",
      "size_bytes": "number"
    }
  ]
}
```

#### metadata_json Structure
```json
{
  "agent_version": "string",
  "environment": "string",
  "user_id": "string",
  "tags": ["string"],
  "custom_fields": {
    "field_name": "field_value"
  }
}
```

### Example Data

| id | session_name | created_at | status | source_type | config_json | results_json | metadata_json |
|----|--------------|------------|--------|-------------|-------------|--------------|---------------|
| 1 | "Customer Data Collection Q4" | "2025-01-01T10:00:00Z" | "completed" | "api" | {"data_source": "crm_api", "collection_method": "batch", "parameters": {"batch_size": 1000}} | {"total_records": 5000, "processed_records": 5000, "success_count": 4985, "error_count": 15} | {"agent_version": "2.1.0", "environment": "production", "user_id": "user_123"} |

## Jobs Schema

The Jobs table manages individual processing tasks within sessions, including their execution state and output.

### Columns

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Unique job identifier |
| session_id | INTEGER | Foreign key to Sessions table |
| job_name | TEXT | Descriptive job name |
| job_type | TEXT | Type of job (extraction/transformation/validation) |
| status | TEXT | Current job status (queued/running/completed/failed/cancelled) |
| priority | INTEGER | Job execution priority (1-10) |
| scheduled_at | TIMESTAMP | When job should start |
| started_at | TIMESTAMP | Actual job start time |
| completed_at | TIMESTAMP | Job completion time |
| payload | JSON | Job input data and parameters |
| output_data | JSON | Job execution results |
| error_details | JSON | Error information if job failed |

### JSON Field Types

#### payload Structure
```json
{
  "input_data": {
    "source_files": ["string"],
    "query_parameters": {
      "param_name": "param_value"
    }
  },
  "processing_options": {
    "validation_level": "string",
    "output_format": "string",
    "compression": "boolean"
  },
  "workflow_config": {
    "steps": [
      {
        "step_name": "string",
        "step_type": "string",
        "configuration": {}
      }
    ]
  }
}
```

#### output_data Structure
```json
{
  "processed_items": "number",
  "output_files": [
    {
      "filename": "string",
      "format": "string",
      "record_count": "number",
      "file_size": "number"
    }
  ],
  "metrics": {
    "processing_time_ms": "number",
    "memory_usage_mb": "number",
    "cpu_usage_percent": "number"
  },
  "validation_results": {
    "passed": "boolean",
    "warnings": ["string"],
    "errors": ["string"]
  }
}
```

#### error_details Structure
```json
{
  "error_code": "string",
  "error_message": "string",
  "stack_trace": "string",
  "context": {
    "input_record": {},
    "processing_step": "string",
    "timestamp": "string"
  },
  "recovery_suggestions": ["string"]
}
```

### Example Data

| id | session_id | job_name | job_type | status | priority | payload | output_data | error_details |
|----|------------|----------|----------|--------|----------|---------|-------------|---------------|
| 1 | 1 | "Extract Customer Records" | "extraction" | "completed" | 5 | {"input_data": {"source_files": ["customers.csv"]}, "processing_options": {"validation_level": "strict"}} | {"processed_items": 1000, "output_files": [{"filename": "customers_clean.json", "record_count": 995}]} | null |

## Control Schema

The Control table manages system-wide configuration, feature flags, and operational parameters.

### Columns

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Unique control record identifier |
| control_key | TEXT UNIQUE | Unique identifier for the control setting |
| control_type | TEXT | Type of control (config/feature_flag/setting) |
| control_value | JSON | The actual control value/configuration |
| description | TEXT | Human-readable description |
| environment | TEXT | Environment this control applies to |
| is_active | BOOLEAN | Whether this control is currently active |
| created_at | TIMESTAMP | When control was created |
| updated_at | TIMESTAMP | Last modification timestamp |
| created_by | TEXT | User who created this control |
| qna_json | JSON | Questions and answers about this control |

### JSON Field Types

#### control_value Structure
```json
{
  "value": "any",
  "data_type": "string",
  "constraints": {
    "min_value": "number",
    "max_value": "number",
    "allowed_values": ["any"],
    "pattern": "string"
  },
  "dependencies": [
    {
      "control_key": "string",
      "required_value": "any"
    }
  ]
}
```

#### qna_json Structure
```json
{
  "questions": [
    {
      "id": "string",
      "question": "string",
      "answer": "string",
      "category": "string",
      "priority": "number",
      "last_updated": "string"
    }
  ],
  "faqs": [
    {
      "question": "string",
      "answer": "string",
      "tags": ["string"]
    }
  ],
  "troubleshooting": {
    "common_issues": [
      {
        "issue": "string",
        "solution": "string",
        "severity": "string"
      }
    ]
  }
}
```

### Example Data

| id | control_key | control_type | control_value | description | environment | is_active | qna_json |
|----|-------------|--------------|---------------|-------------|-------------|-----------|----------|
| 1 | "max_concurrent_jobs" | "config" | {"value": 10, "data_type": "integer", "constraints": {"min_value": 1, "max_value": 50}} | "Maximum number of jobs that can run simultaneously" | "production" | true | {"questions": [{"id": "q1", "question": "How to adjust job concurrency?", "answer": "Modify the value field in control_value"}]} |

---

**Important Notes**:
- All JSON fields must conform to valid JSON syntax
- Timestamps follow ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
- Foreign key relationships must be maintained (Jobs.session_id → Sessions.id)
- All schemas align with the canonical agent specification v2.1
- Only representative examples are shown; actual data may contain additional fields
