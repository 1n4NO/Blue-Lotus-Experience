import { PageTransition } from '@/components/page-transition';

type TemplateProps = {
  children: React.ReactNode;
};

export default function Template({ children }: TemplateProps) {
  return <PageTransition>{children}</PageTransition>;
}
