import React from "react";
import { TableWork } from "src/@types/works";
import { getAllWorks } from "src/api/filters";
import {
  formatArrayDate,
  getMonthAndYear,
  sortByChecked,
  sortByCreatedAt,
  sortByDate,
} from "src/helpers/filters";

export default function useWorks(setIsLoading: any) {
  const [firstTime, setFirstTime] = React.useState(true);
  const [works, setWorks] = React.useState<TableWork[]>([]);

  React.useEffect(() => {
    const getDatesFromAPI = async () => {
      setIsLoading(true);
      const { data, error } = await getAllWorks();
      if (error) {
        setIsLoading(false);
      }
      if (data) {
        if (data.works) {
          const worksModified: TableWork[] = await Promise.all(
            data.works.map((work: TableWork) => {
              return { ...work, checked: true };
            })
          );
          setWorks(worksModified.sort(sortByDate));
        }
      }
    };

    // If component is mounted update state
    if (firstTime) {
      getDatesFromAPI();
      setFirstTime(false);
    }
  }, [firstTime, setIsLoading]);

  const filterWorksByDate = async (date: string) => {
    if (date !== "Todos los periodos" && date) {
      const period = date;
      const filteredWorks = await Promise.all(
        works
          .map((work) => {
            if (!work.date) {
              return { ...work, checked: false };
            } else {
              const currentDate = formatArrayDate(work.date);
              const currentPeriod = getMonthAndYear(currentDate);
              if (currentPeriod === period) {
                return { ...work, checked: true };
              }
              return { ...work, checked: false };
            }
          })
          .sort(sortByCreatedAt)
          .sort(sortByChecked)
      );
      setWorks(filteredWorks);
    } else if (date) {
      const checkedWorks = await Promise.all(
        works.map((work) => ({ ...work, checked: true }))
      );
      const sorted = checkedWorks.sort(sortByDate);
      setWorks(sorted);
    }
  };

  const filterByClientName = async (name: string) => {
    if (name !== "Todos los clientes") {
      const filteredWorks: TableWork[] = await Promise.all(
        works
          .map((work) => {
            if (work.client === name) {
              return { ...work, checked: true };
            }
            return { ...work, checked: false };
          })
          .filter((work) => work)
          .sort(sortByDate)
          .sort(sortByChecked)
      );
      setWorks(filteredWorks);
    } else {
      const checkedWorks = await Promise.all(
        works.map((work) => ({ ...work, checked: true }))
      );
      const sorted = checkedWorks.sort(sortByDate);
      setWorks(sorted);
    }
  };

  const filterByEmployee = async (role: string) => {
    if (role !== "Todos los tipos") {
      const filteredWorks: TableWork[] = await Promise.all(
        works
          .map((work) => {
            if (work.role === role) {
              return { ...work, checked: true };
            }
            return { ...work, checked: false };
          })
          .filter((work) => work)
          .sort(sortByDate)
          .sort(sortByChecked)
      );
      setWorks(filteredWorks);
    } else {
      const checkedWorks = await Promise.all(
        works.map((work) => ({ ...work, checked: true }))
      );
      const sorted = checkedWorks.sort(sortByDate);
      setWorks(sorted);
    }
  };

  const filterByMachine = async (machine: string) => {
    if (machine !== "Toda la maquinaria") {
      const filteredWorks: TableWork[] = await Promise.all(
        works
          .map((work) => {
            if (work.machine === machine) {
              return { ...work, checked: true };
            }
            return { ...work, checked: false };
          })
          .filter((work) => work)
          .sort(sortByDate)
          .sort(sortByChecked)
      );
      setWorks(filteredWorks);
    } else {
      const checkedWorks = await Promise.all(
        works.map((work) => ({ ...work, checked: true }))
      );
      const sorted = checkedWorks.sort(sortByDate);
      setWorks(sorted);
    }
  };

  const filterByVehicle = async (vehicle: string) => {
    if (vehicle !== "Todos los veh??culos") {
      const filteredWorks: TableWork[] = await Promise.all(
        works
          .map((work) => {
            if (work.machine === vehicle) {
              return { ...work, checked: true };
            }
            return { ...work, checked: false };
          })
          .filter((work) => work)
          .sort(sortByDate)
          .sort(sortByChecked)
      );
      setWorks(filteredWorks);
    } else {
      const checkedWorks = await Promise.all(
        works.map((work) => ({ ...work, checked: true }))
      );
      const sorted = checkedWorks.sort(sortByDate);
      setWorks(sorted);
    }
  };

  const sortByCreated = async (order: "asc" | "des") => {
    const filteredWorks: TableWork[] = await Promise.all(
      works
        .filter((work) => work)
        .sort(sortByDate)
        .sort(sortByCreatedAt)
        .sort(sortByChecked)
    );
    if (order === "des") {
      filteredWorks.reverse().sort(sortByChecked);
    }
    setWorks(filteredWorks);
  };

  const sortByDateOption = async (order: "asc" | "des") => {
    const filteredWorks: TableWork[] = await Promise.all(
      works
        .filter((work) => work)
        .sort(sortByDate)
        .sort(sortByChecked)
    );
    if (order === "des") {
      filteredWorks
        .reverse()
        .sort((worka, workb) => {
          if (!worka.date) return 1;
          if (!workb.date) return -1;
          return -1;
        })
        .sort(sortByChecked);
    }
    setWorks(filteredWorks);
  };

  const searchWorksByDate = async (keyword: string) => {
    if (keyword !== "") {
      const filteredWorks = await Promise.all(
        works
          .map((work) => {
            if (!work.date) {
              return { ...work, checked: false };
            } else {
              const currentDate = formatArrayDate(
                work.date
              ).toLocaleLowerCase();
              const currentKeyword = keyword.toLocaleLowerCase();
              if (currentDate.includes(currentKeyword)) {
                return { ...work, checked: true };
              }
              return { ...work, checked: false };
            }
          })
          .sort(sortByDate)
          .sort(sortByChecked)
      );
      setWorks(filteredWorks);
    } else {
      const checkedWorks = await Promise.all(
        works.map((work) => ({ ...work, checked: true }))
      );
      const sorted = checkedWorks.sort(sortByDate);
      setWorks(sorted);
    }
  };

  const searchWorksByClient = async (keyword: string) => {
    if (keyword !== "") {
      const filteredWorks = await Promise.all(
        works
          .map((work) => {
            if (!work.client) {
              return { ...work, checked: false };
            } else {
              const currentData = work.client.toLocaleLowerCase();
              const currentKeyword = keyword.toLocaleLowerCase();
              if (currentData.includes(currentKeyword)) {
                return { ...work, checked: true };
              }
              return { ...work, checked: false };
            }
          })
          .sort(sortByDate)
          .sort(sortByChecked)
      );
      setWorks(filteredWorks);
    } else {
      const checkedWorks = await Promise.all(
        works.map((work) => ({ ...work, checked: true }))
      );
      const sorted = checkedWorks.sort(sortByDate);
      setWorks(sorted);
    }
  };

  const searchWorksByEmployee = async (keyword: string) => {
    if (keyword !== "") {
      const filteredWorks = await Promise.all(
        works
          .map((work) => {
            if (!work.userName) {
              return { ...work, checked: false };
            } else {
              const currentData = work.userName.toLocaleLowerCase();
              const currentKeyword = keyword.toLocaleLowerCase();
              if (currentData.includes(currentKeyword)) {
                return { ...work, checked: true };
              }
              return { ...work, checked: false };
            }
          })
          .sort(sortByDate)
          .sort(sortByChecked)
      );
      setWorks(filteredWorks);
    } else {
      const checkedWorks = await Promise.all(
        works.map((work) => ({ ...work, checked: true }))
      );
      const sorted = checkedWorks.sort(sortByDate);
      setWorks(sorted);
    }
  };

  const searchWorksByKeyword = async (keyword: string) => {
    if (keyword !== "") {
      const filteredWorks = await Promise.all(
        works
          .map((work) => {
            for (const key in work) {
              const cKey = key as keyof TableWork;
              if (work[cKey]) {
                const currentData =
                  cKey === "date"
                    ? formatArrayDate(work.date).toLocaleLowerCase()
                    : work[cKey]?.toString().toLocaleLowerCase();
                const currentKeyword = keyword.toLocaleLowerCase();
                if (
                  currentData &&
                  currentData.includes(currentKeyword) &&
                  currentData !== "N/A"
                ) {
                  return { ...work, checked: true };
                }
              }
            }
            return { ...work, checked: false };
          })
          .sort(sortByDate)
          .sort(sortByChecked)
      );
      setWorks(filteredWorks);
    } else {
      const checkedWorks = await Promise.all(
        works.map((work) => ({ ...work, checked: true }))
      );
      const sorted = checkedWorks.sort(sortByDate);
      setWorks(sorted);
    }
  };

  return {
    works,
    filterWorksByDate,
    filterByClientName,
    filterByEmployee,
    filterByMachine,
    filterByVehicle,
    sortByCreated,
    searchWorksByDate,
    searchWorksByClient,
    searchWorksByEmployee,
    searchWorksByKeyword,
    sortByDateOption,
  };
}
