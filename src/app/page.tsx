import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getCabins from "@/app/actions/getCabins";
import CabinCard from "@/app/components/cabins/CabinCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SearchBar from "@/app/components/SearchBar";

export default async function Home() {
  const cabins = await getCabins();
  const currentUser = await getCurrentUser();

  if (cabins.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <SearchBar />
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {cabins.map((cabin: any) => (
            <CabinCard
              key={cabin.id}
              data={cabin}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}