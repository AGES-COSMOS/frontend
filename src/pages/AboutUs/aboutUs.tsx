import Loading from 'components/Loading/loading';
import { useEffect, useState } from 'react';
import { getAboutUs } from 'services/aboutUsService';

interface AboutUsInfo {
  id: number;
  content: string;
  updateAt: string;
}

export const AboutUs = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState<AboutUsInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: AboutUsInfo = await getAboutUs();
        setAboutUsInfo(result);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>AboutUs</h2>
      {aboutUsInfo?.content}
    </div>
  );
};
