# Apps Script Web App Documentation

This document provides comprehensive documentation for the deployed Google Apps Script Web App that serves as the backend for the SFA Phase 6 system.

## Deployment Information

**Base URL:** https://script.google.com/macros/s/AKfycbzF6tnq3255H6BqKuoXMmq6A2KFGjqzImU4eQUi3Igew47zAxe6kuhGpPdUlKLqqmniOA/exec

**Status:** Deployed and Active

**Last Updated:** September 16, 2025

## API Endpoints

The Web App provides the following REST API endpoints for system interaction:

### 1. /start - Initialize Session

**Summary:** Initializes a new data collection session and returns session metadata.

**Method:** POST

**Content-Type:** application/json

**Request Body:**
```json
{
  "session_name": "string",
  "source_type": "api|file|manual",
  "config": {
    "data_source": "string",
    "collection_method": "string",
    "parameters": {}
  }
}
```

**Response:**
```json
{
  "success": true,
  "session_id": "integer",
  "session_name": "string",
  "status": "pending",
  "created_at": "timestamp"
}
```

**cURL Example:**
```bash
curl -X POST \
  "https://script.google.com/macros/s/AKfycbzF6tnq3255H6BqKuoXMmq6A2KFGjqzImU4eQUi3Igew47zAxe6kuhGpPdUlKLqqmniOA/exec?action=start" \
  -H "Content-Type: application/json" \
  -d '{
    "session_name": "Customer Data Collection Q4",
    "source_type": "api",
    "config": {
      "data_source": "crm_api",
      "collection_method": "batch",
      "parameters": {
        "batch_size": 1000
      }
    }
  }'
```

### 2. /message - Send System Message

**Summary:** Sends operational messages and updates to the system for logging and monitoring.

**Method:** POST

**Content-Type:** application/json

**Request Body:**
```json
{
  "session_id": "integer",
  "message_type": "info|warning|error|debug",
  "message": "string",
  "metadata": {
    "component": "string",
    "timestamp": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message_id": "string",
  "logged_at": "timestamp"
}
```

**cURL Example:**
```bash
curl -X POST \
  "https://script.google.com/macros/s/AKfycbzF6tnq3255H6BqKuoXMmq6A2KFGjqzImU4eQUi3Igew47zAxe6kuhGpPdUlKLqqmniOA/exec?action=message" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 12345,
    "message_type": "info",
    "message": "Data collection process started successfully",
    "metadata": {
      "component": "data_collector",
      "timestamp": "2025-09-16T12:00:00Z"
    }
  }'
```

### 3. /choice - Submit User Choice

**Summary:** Records user decisions and configuration choices for session processing.

**Method:** POST

**Content-Type:** application/json

**Request Body:**
```json
{
  "session_id": "integer",
  "choice_type": "string",
  "choice_value": "any",
  "context": {
    "step": "string",
    "options": []
  }
}
```

**Response:**
```json
{
  "success": true,
  "choice_id": "string",
  "recorded_at": "timestamp",
  "next_action": "string"
}
```

**cURL Example:**
```bash
curl -X POST \
  "https://script.google.com/macros/s/AKfycbzF6tnq3255H6BqKuoXMmq6A2KFGjqzImU4eQUi3Igew47zAxe6kuhGpPdUlKLqqmniOA/exec?action=choice" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 12345,
    "choice_type": "data_format",
    "choice_value": "json",
    "context": {
      "step": "output_configuration",
      "options": ["json", "csv", "xml"]
    }
  }'
```

### 4. /upload_callback - Handle Upload Completion

**Summary:** Processes callbacks from file upload operations and updates session status.

**Method:** POST

**Content-Type:** application/json

**Request Body:**
```json
{
  "session_id": "integer",
  "upload_id": "string",
  "status": "completed|failed|partial",
  "file_info": {
    "filename": "string",
    "size_bytes": "integer",
    "mime_type": "string",
    "checksum": "string"
  },
  "error_details": {
    "error_code": "string",
    "error_message": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "processed": true,
  "job_id": "integer",
  "next_steps": ["string"]
}
```

**cURL Example:**
```bash
curl -X POST \
  "https://script.google.com/macros/s/AKfycbzF6tnq3255H6BqKuoXMmq6A2KFGjqzImU4eQUi3Igew47zAxe6kuhGpPdUlKLqqmniOA/exec?action=upload_callback" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 12345,
    "upload_id": "upload_789",
    "status": "completed",
    "file_info": {
      "filename": "customer_data.csv",
      "size_bytes": 2048576,
      "mime_type": "text/csv",
      "checksum": "sha256:abc123..."
    }
  }'
```

## Authentication

The Web App currently operates with the following authentication model:
- **Deployment:** Public access with script permissions
- **Authorization:** Runs as the script owner
- **Access:** Anyone with the URL can execute

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

## Rate Limiting

- **Quota:** Google Apps Script execution quotas apply
- **Concurrent Executions:** Limited by Google Apps Script platform
- **Timeout:** 6 minutes maximum execution time per request

## Integration Notes

1. All requests should include proper Content-Type headers
2. Responses are always in JSON format
3. Session IDs are required for most operations after initialization
4. The Web App integrates with Google Sheets for data persistence
5. Error logging is handled internally within the Apps Script environment

## Monitoring and Logs

Execution logs and performance metrics are available through:
- Google Apps Script dashboard
- Cloud Console (if enabled)
- Built-in Apps Script logging

## Support

For issues or questions regarding the Apps Script Web App:
1. Check the Apps Script execution transcript
2. Review Google Sheets data for session status
3. Verify endpoint URLs and request formatting
4. Consult Google Apps Script documentation for platform limitations
