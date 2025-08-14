export interface Sales {
  total: number;
  createdAt: Date;
  saleItems: {
    quantity: number;
  }[];
}

export function dailyFilter(sales: Sales[]) {
  let finalData: Record<string, { revenue: number; sales: number }> = {};

  sales.reduce((acc, sale) => {
    // gets the full date
    const dateKey = sale.createdAt.toISOString().split("T")[0];
    // sets the date as ket if doesn't exist
    if (!finalData[dateKey]) {
      finalData[dateKey] = { revenue: 0, sales: 0 };
    }

    // adds the data if existing
    finalData[dateKey].revenue += sale.total;
    finalData[dateKey].sales += sale.saleItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return acc;
  }, 0);

  return finalData;
}

export function weeklyFilter(sales: Sales[]) {
  // number of weeks in a month
  const weeksInMonth = 4;

  // start and end date of week per month
  let startOfWeek = 1;
  let endOfWeek = 7;

  // data container
  let finalData: Record<string, { revenue: number; sales: number }> = {};

  for (let i = 1; i <= 4; i++) {
    const weekKey = `week ${i}`;

    finalData[weekKey] = { revenue: 0, sales: 0 };
    sales.reduce((acc, sale) => {
      // gets the date
      const date = Number(sale.createdAt.toString().slice(8, 10));

      // filters date wihtin the week
      if (date >= startOfWeek && date <= endOfWeek) {
        finalData[weekKey].revenue += sale.total;
        finalData[weekKey].sales += sale.saleItems.length;
      }
      // for date more than 28
      else if (date >= 28) {
        finalData["week 4"].revenue += sale.total;
        finalData["week 4"].sales += sale.saleItems.length;
      }
      return acc;
    }, 0);

    // adds 7(days per week) to start and end of the week
    startOfWeek += 7;
    endOfWeek += 7;
  }

  return finalData;
}

export function monthlyFilter(sales: Sales[]) {
  // data container
  let finalData: Record<string, { revenue: number; sales: number }> = {};

  sales.reduce((acc, sale) => {
    const month = sale.createdAt.getMonth();
    const monthName = new Date(2025, month).toLocaleDateString("default", {
      month: "long",
    });

    if (!finalData[monthName]) {
      finalData[monthName] = { revenue: 0, sales: 0 };
    }

    finalData[monthName].revenue += sale.total;
    finalData[monthName].sales += sale.saleItems.length;
    return acc;
  }, 0);

  return finalData;
}
