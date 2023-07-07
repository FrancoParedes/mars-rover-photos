import { useRouter } from 'next/router';
import Image from "next/image";
import Button from '../modules/shared/ui/Button';

export default function Home() {
  const router = useRouter();

  const goToGallery = () => {
    router.push('/gallery');
  };

  return (
    <div className="flex flex-col mt-20 place-items-center">
      <Image src="/logo-nasa.png" width="350" height="350" className="m-auto mb-5" alt="logo nasa"/>
      <Button
        className="!mt-4"
        variant="outlined"
        text="GO TO GALLERY"
        type="button"
        size="large"
        onClick={goToGallery}
      />
    </div>
  );
}
