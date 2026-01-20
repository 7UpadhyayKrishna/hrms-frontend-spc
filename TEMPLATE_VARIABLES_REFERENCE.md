# Email Template Variables - Quick Reference

## Available Variables

| Variable | Description | Example Output |
|----------|-------------|----------------|
| `{{candidateName}}` | Full name of the candidate | John Doe |
| `{{candidateEmail}}` | Candidate's email address | john.doe@email.com |
| `{{position}}` | Job position/designation | Senior Software Engineer |
| `{{department}}` | Department name | Engineering |
| `{{offeredCTC}}` | Offered annual CTC | 1200000 |
| `{{startDate}}` | Proposed start date | 2026-02-15 |
| `{{joiningDate}}` | Joining date | 2026-02-15 |
| `{{companyName}}` | Your company name | Tech Solutions Inc. |
| `{{hrName}}` | HR person's name | Jane Smith |
| `{{hrEmail}}` | HR email address | hr@company.com |
| `{{hrPhone}}` | HR phone number | +91-9876543210 |
| `{{expiryDate}}` | Offer expiry date | 2026-02-01 |

## Variable Usage Examples

### Basic Usage
```
Dear {{candidateName}},

We are pleased to offer you the position of {{position}} at {{companyName}}.
```
**Output:**
```
Dear John Doe,

We are pleased to offer you the position of Senior Software Engineer at Tech Solutions Inc.
```

### Subject Lines
```
Subject: Congratulations! Offer for {{position}} at {{companyName}}
```
**Output:**
```
Subject: Congratulations! Offer for Senior Software Engineer at Tech Solutions Inc.
```

### Compensation Details
```
Annual CTC: ₹{{offeredCTC}}
Start Date: {{startDate}}
```
**Output:**
```
Annual CTC: ₹1200000
Start Date: 2026-02-15
```

### Contact Information
```
Best regards,
{{hrName}}
{{companyName}}
{{hrEmail}} | {{hrPhone}}
```
**Output:**
```
Best regards,
Jane Smith
Tech Solutions Inc.
hr@company.com | +91-9876543210
```

## Category-Specific Templates

### Full-Time Templates
**Recommended Variables:**
- `{{candidateName}}`
- `{{position}}`
- `{{department}}`
- `{{offeredCTC}}`
- `{{startDate}}`
- `{{companyName}}`
- `{{hrName}}`
- `{{hrEmail}}`
- `{{expiryDate}}`

### Intern Templates
**Recommended Variables:**
- `{{candidateName}}`
- `{{position}}`
- `{{department}}`
- `{{offeredCTC}}` (as monthly stipend)
- `{{startDate}}`
- `{{companyName}}`
- `{{hrName}}`

### Executive Templates
**Recommended Variables:**
- `{{candidateName}}`
- `{{position}}`
- `{{department}}`
- `{{offeredCTC}}`
- `{{startDate}}`
- `{{companyName}}`
- `{{hrName}}`
- `{{hrEmail}}`
- `{{hrPhone}}`
- `{{expiryDate}}`

### Contract Templates
**Recommended Variables:**
- `{{candidateName}}`
- `{{position}}`
- `{{offeredCTC}}`
- `{{startDate}}`
- `{{companyName}}`
- `{{hrName}}`
- `{{hrEmail}}`
- `{{expiryDate}}`

## Best Practices

### ✅ DO:
- Use variables for any data that changes per candidate
- Include `{{expiryDate}}` to create urgency
- Always include contact information (`{{hrName}}`, `{{hrEmail}}`, `{{hrPhone}}`)
- Use `{{companyName}}` for branding consistency
- Test templates with sample data before activating

### ❌ DON'T:
- Hardcode candidate-specific information
- Forget to include expiry information
- Use variables that might be empty/undefined
- Overcomplicate subject lines
- Use too many variables in one sentence

## Common Template Patterns

### Professional Greeting
```
Dear {{candidateName}},

We are delighted to extend an offer for the position of {{position}} at {{companyName}}.
```

### Offer Details Section
```
POSITION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Position: {{position}}
Department: {{department}}
Annual CTC: ₹{{offeredCTC}}
Start Date: {{startDate}}
```

### Urgency/Expiry Notice
```
This offer is valid until {{expiryDate}}. Please confirm your acceptance by replying to this email.
```

### Professional Closing
```
We look forward to welcoming you to {{companyName}}!

Best regards,
{{hrName}}
HR Department
{{companyName}}
{{hrEmail}} | {{hrPhone}}
```

## Formatting Tips

### Use Visual Separators
```
OFFER DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Use Bullet Points
```
BENEFITS:
• Comprehensive health insurance
• Professional development opportunities
• Flexible work arrangements
• Stock options
```

### Use Checkmarks for Lists
```
WHAT TO EXPECT:
✓ Onboarding orientation
✓ Team introduction
✓ Equipment setup
✓ First week training
```

### Use Emojis Sparingly (Modern Look)
```
Subject: 🎉 Congratulations! You've got the job!

Dear {{candidateName}},

🌟 We are excited to offer you...
```

## Template Testing Checklist

Before activating a template, verify:

- [ ] All variables are spelled correctly
- [ ] Variables have proper spacing around them
- [ ] Subject line is clear and professional
- [ ] Content flows naturally with variables
- [ ] Contact information is complete
- [ ] Expiry date is mentioned
- [ ] Next steps are clear
- [ ] Company branding is consistent
- [ ] No spelling/grammar errors
- [ ] Professional tone throughout

## Troubleshooting

### Variable Not Replacing
**Problem:** `{{candidateName}}` appears literally in sent email

**Causes:**
- Variable misspelled (e.g., `{{candidatname}}`)
- Missing one curly brace (e.g., `{{candidateName}`)
- Extra spaces (e.g., `{{ candidateName }}`)

**Solution:** Use exact variable names with double curly braces and no spaces

### Empty Values
**Problem:** Variable shows as blank in email

**Causes:**
- Data not provided when sending offer
- Variable not supported by backend

**Solution:** Ensure all required data is filled in the send offer form

### Formatting Issues
**Problem:** Email looks different than preview

**Causes:**
- Email client rendering differences
- Special characters not escaped

**Solution:** Keep formatting simple, test in multiple email clients

## Quick Copy-Paste Variables

```
{{candidateName}}
{{candidateEmail}}
{{position}}
{{department}}
{{offeredCTC}}
{{startDate}}
{{joiningDate}}
{{companyName}}
{{hrName}}
{{hrEmail}}
{{hrPhone}}
{{expiryDate}}
```

## Support

For questions about variables or template creation:
1. Refer to the main user guide: `OFFER_EMAIL_TEMPLATES_GUIDE.md`
2. Contact your system administrator
3. Check with HR technology team

---

**Last Updated:** January 2026
**Version:** 1.0
