type SeoSchemaProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function SeoSchema({ data }: SeoSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
