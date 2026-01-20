# Offer Letter Email Templates - User Guide

## Overview
The HRMS system now includes a comprehensive email template management system for sending offer letters. You can create multiple email templates for different employment categories and select the appropriate one when sending offers to candidates.

## Features

### 1. **Template Management**
- Create, edit, duplicate, and delete email templates
- Organize templates by category (Full-Time, Part-Time, Contract, Intern, Executive, General)
- Set templates as active/inactive/draft
- Preview templates before sending
- Track template usage

### 2. **Dynamic Variables**
Templates support dynamic variables that are automatically replaced when sending offers:
- `{{candidateName}}` - Candidate's full name
- `{{candidateEmail}}` - Candidate's email address
- `{{position}}` - Job position/designation
- `{{department}}` - Department name
- `{{offeredCTC}}` - Offered annual CTC
- `{{startDate}}` - Proposed start date
- `{{joiningDate}}` - Joining date
- `{{companyName}}` - Your company name
- `{{hrName}}` - HR person's name
- `{{hrEmail}}` - HR email
- `{{hrPhone}}` - HR phone number
- `{{expiryDate}}` - Offer expiry date

### 3. **Template Selection When Sending Offers**
When sending an offer from the Onboarding page, you can:
- Select from all active templates
- See template preview and description
- Default template is pre-selected if available
- Fill in candidate details (name, designation, CTC, start date)

## How to Use

### Creating a New Template

1. **Navigate to Offer Templates**
   - Go to Employees → Offer Templates

2. **Click "Create Template"**
   - Fill in the template details:
     - **Name**: Descriptive name (e.g., "Full-Time Software Engineer Offer")
     - **Category**: Select appropriate category
     - **Description**: Brief description of when to use this template
     - **Email Subject**: Subject line (can use variables)
     - **Email Content**: Full email body (use variables for dynamic content)
     - **Status**: Draft/Active/Inactive
     - **Offer Expiry Days**: Number of days before offer expires
     - **Set as Default**: Check if this should be the default template

3. **Use Variable Insertion**
   - Click the variable dropdown to insert variables
   - Variables are formatted as `{{variableName}}`

4. **Save and Activate**
   - Save as draft to edit later
   - Set to active when ready to use

### Sending an Offer with a Template

1. **Navigate to Onboarding**
   - Go to Employees → Onboarding

2. **Find Candidate in Pre-boarding Status**
   - Click "Send Offer" button

3. **Select Template and Fill Details**
   - Choose the appropriate email template
   - Enter candidate name, designation, CTC, and start date
   - Preview the selected template

4. **Send Offer Email**
   - Click "Send Offer Email"
   - The email will be sent with all variables populated

## Sample Templates

### 1. Full-Time Employee Offer

**Template Name**: Full-Time Employment Offer
**Category**: Full-Time
**Subject**: 🎉 Congratulations! Offer Letter - {{position}} at {{companyName}}

**Content**:
```
Dear {{candidateName}},

We are thrilled to extend an offer for the position of {{position}} at {{companyName}}!

After careful consideration of your qualifications and experience, we believe you would be an excellent addition to our {{department}} team.

OFFER DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Position: {{position}}
Department: {{department}}
Employment Type: Full-Time
Annual CTC: ₹{{offeredCTC}}
Proposed Start Date: {{startDate}}

NEXT STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. This offer is valid until {{expiryDate}}
2. Please reply to this email to confirm your acceptance
3. Our HR team will reach out with onboarding documents
4. Complete all required documentation before your start date

WHAT TO EXPECT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Comprehensive health insurance
✓ Professional development opportunities
✓ Collaborative work environment
✓ Modern tools and technologies

We look forward to welcoming you to the {{companyName}} family!

If you have any questions, please don't hesitate to reach out.

Warm regards,

{{hrName}}
HR Department
{{companyName}}
Email: {{hrEmail}}
Phone: {{hrPhone}}
```

### 2. Intern Offer

**Template Name**: Internship Offer
**Category**: Intern
**Subject**: Welcome Aboard! Internship Offer - {{position}} at {{companyName}}

**Content**:
```
Dear {{candidateName}},

Congratulations! We are excited to offer you an internship position as {{position}} at {{companyName}}.

INTERNSHIP DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Position: {{position}}
Department: {{department}}
Type: Internship
Stipend: ₹{{offeredCTC}} (Monthly)
Start Date: {{startDate}}

LEARNING OPPORTUNITIES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Work on real-world projects
• Learn from experienced professionals
• Mentorship and guidance
• Potential for full-time conversion

ACCEPTANCE DEADLINE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please confirm your acceptance by {{expiryDate}} by replying to this email.

We're excited to have you join our team and contribute to exciting projects!

Best regards,

{{hrName}}
{{companyName}}
{{hrEmail}} | {{hrPhone}}
```

### 3. Contract/Consultant Offer

**Template Name**: Contract Position Offer
**Category**: Contract
**Subject**: Contract Offer - {{position}} at {{companyName}}

**Content**:
```
Dear {{candidateName}},

We are pleased to offer you a contract position as {{position}} with {{companyName}}.

CONTRACT TERMS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Position: {{position}}
Department: {{department}}
Contract Type: Fixed-term Contract
Annual Compensation: ₹{{offeredCTC}}
Contract Start Date: {{startDate}}

PROJECT SCOPE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You will be working with the {{department}} team on specialized projects requiring your expertise.

TERMS & CONDITIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Detailed contract agreement will be provided
• Payment terms as per contract
• Project deliverables and milestones
• Confidentiality and IP agreements

ACCEPTANCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This offer is valid until {{expiryDate}}. Please confirm your acceptance by replying to this email.

We look forward to working with you!

Best regards,

{{hrName}}
HR Department
{{companyName}}
{{hrEmail}} | {{hrPhone}}
```

### 4. Executive/Senior Position Offer

**Template Name**: Executive Position Offer
**Category**: Executive
**Subject**: Executive Offer - {{position}} at {{companyName}}

**Content**:
```
Dear {{candidateName}},

On behalf of {{companyName}}, I am delighted to extend an offer for the executive position of {{position}}.

Your extensive experience and proven track record make you an ideal candidate to lead our {{department}} team and drive strategic initiatives.

POSITION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: {{position}}
Department: {{department}}
Reporting Structure: [To be discussed]
Annual Compensation: ₹{{offeredCTC}}
Anticipated Start Date: {{startDate}}

COMPENSATION PACKAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Competitive base salary
• Performance-based incentives
• Stock options (if applicable)
• Executive benefits package
• Flexible work arrangements

STRATEGIC RESPONSIBILITIES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Leadership of {{department}} department
• Strategic planning and execution
• Team development and mentorship
• Cross-functional collaboration
• Innovation and growth initiatives

NEXT STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This offer is valid until {{expiryDate}}. We would be pleased to schedule a call to discuss any questions you may have and finalize details.

Please confirm your acceptance by replying to this email.

We are excited about the prospect of you joining our leadership team and contributing to {{companyName}}'s continued success.

Sincerely,

{{hrName}}
{{companyName}} Leadership Team
{{hrEmail}}
{{hrPhone}}
```

### 5. Part-Time Position Offer

**Template Name**: Part-Time Employment Offer
**Category**: Part-Time
**Subject**: Part-Time Position Offer - {{position}} at {{companyName}}

**Content**:
```
Dear {{candidateName}},

We are pleased to offer you a part-time position as {{position}} at {{companyName}}.

POSITION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Position: {{position}}
Department: {{department}}
Employment Type: Part-Time
Annual Compensation: ₹{{offeredCTC}}
Start Date: {{startDate}}

WORK ARRANGEMENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Flexible working hours
• [Specify hours/days per week]
• Remote/Hybrid options available
• Part-time benefits included

RESPONSIBILITIES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You will be working with the {{department}} team on specific projects and deliverables as outlined in your role description.

OFFER VALIDITY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This offer is valid until {{expiryDate}}. Please confirm your acceptance by replying to this email.

We look forward to having you as part of our team!

Best regards,

{{hrName}}
{{companyName}}
{{hrEmail}} | {{hrPhone}}
```

## Best Practices

1. **Create Multiple Templates**: Have at least one template for each category you hire for
2. **Keep Content Professional**: Use clear, professional language
3. **Be Specific**: Include all relevant details in the offer
4. **Use Variables**: Leverage variables for personalization and accuracy
5. **Set Appropriate Expiry**: Give candidates reasonable time to respond (7-14 days typical)
6. **Mark Primary Template as Default**: Set your most commonly used template as default
7. **Regular Updates**: Review and update templates periodically
8. **Preview Before Sending**: Always preview how the final email will look

## Troubleshooting

**Q: No templates appear when sending offers?**
A: Make sure at least one template has "Active" status. Draft or inactive templates won't appear.

**Q: Variables not being replaced?**
A: Ensure variables are formatted correctly with double curly braces: `{{variableName}}`

**Q: Need to update an offer email after sending?**
A: Emails cannot be edited after sending. Create a new template or edit the existing one for future offers.

**Q: How to set a template as default?**
A: Edit the template and check the "Set as Default" checkbox. Only one template can be default at a time.

## Support

For technical support or questions about the offer email template system, please contact your system administrator or HR technology team.
