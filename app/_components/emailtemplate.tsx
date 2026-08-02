interface EmailTemplateProps {
  email: string;
  subject: string;
  message: string;
  name: string;
  }

export function EmailTemplate({ email, subject, message, name }: EmailTemplateProps) {
  return (
    <div>
      <h2>{subject}</h2>
      <p>
        <strong>From:</strong> {name} ({email})
      </p>
      <p>{message}</p>
    </div>
  );
}
