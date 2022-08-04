const table = document.getElementById("table-id")
const largerCapacityID = document.getElementById("larger-capacity")
const maxPercentage = document.getElementById("max-percentage")
const minPercentage = document.getElementById("min-percentage")
let dataArray = []


async function dataApi() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(resp => resp.json())
    .then(json => dataArray = json)
    largerCapacity()
    porcentajesMaxMin()
    statisticsUpcoming()
    statisticsPast()
}

dataApi()


const largerCapacity = () => {

    //map del nombre del evento y de la capacidad de todos los objetos
     const arrayCapacity = dataArray.events.map(data => {
        const objectLargerCapacity = {
            evento: data.name,
            numero: Number(data.capacity)
        } 
        return objectLargerCapacity
})
    // 
    const maxCapacity = arrayCapacity.reduce((max, event) => max.numero > event.numero ? max : event)
    console.log(maxCapacity)
    const propertyValues = Object.values(maxCapacity);
    largerCapacityID.innerHTML= `${propertyValues.join(" : ")}`
}

const porcentajesMaxMin = () => {
    const currentDate = dataArray.currentDate
    const arrayPast = dataArray.events.filter(e => currentDate > e.date)
    //map del nombre del evento y del porcentaje de asistencia
    const newArrayPercentage = arrayPast.map(data => {
        const newObject = {
            evento: data.name,
            porcentaje: (data.assistance * 100 / data.capacity).toFixed(0) 
        }
        return newObject
    })

    //tomar el maximo y el minimo de todos los objetos del array
    const max = newArrayPercentage.sort((a,b) => b.porcentaje - a.porcentaje)[0]
    const min = newArrayPercentage.sort((a,b) => a.porcentaje - b.porcentaje)[0]

    //tomar los valores del objeto maximo y minimo
    const propertyValuesMax = Object.values(max)
    const propertyValuesMin = Object.values(min)

    //agrego signo de porcentaje e imprimo
    propertyValuesMax.push("%")
    propertyValuesMin.push("%")
    maxPercentage.innerHTML = `${propertyValuesMax.join(" ")}`
    minPercentage.innerHTML = `${propertyValuesMin.join(" ")}`
}

const statisticsUpcoming = () => {
    const currentDate = dataArray.currentDate
    const arrayUpcoming = dataArray.events.filter(e => currentDate < e.date)

    // Map de los eventos del futuro

    const arrayUpcomingByCategory = arrayUpcoming.map(data => {
        const newObject = {
            category: data.category,
            revenue: data.price * data.estimate,
            porcentaje: (data.estimate * 100 / data.capacity).toFixed(0) 
        }
        return newObject
    })

    const arrayUpcomingFiltered = (arr) => {
        
        return arr.reduce((acc, e) => {
            console.log(arr.filter(data => data.category === e.category).length)
            return {
                ...acc,
                [e.category]: {revenue: acc[e.category]  ? acc[e.category].revenue + e.revenue : e.revenue, 
                porcentaje: acc[e.category] ? ((acc[e.category].porcentaje) + Number(e.porcentaje)) : Number(e.porcentaje),
                total: arr.filter(data => data.category === e.category).length}
            }
        }, {})
    }

    const objectFiltered = arrayUpcomingFiltered(arrayUpcomingByCategory)


    //Imprimir categorias,revenues y porcentaje

         let arrayPrint = `
        <tr>
            <th>Categories</th>
            <th>Revenues</th>
            <th>Percentage of attendance</th>
        </tr>  
         `
         

        Object.entries(objectFiltered).forEach(([key, value]) => {
            arrayPrint += `
            <tr>
                <td>${key}</td>
                <td>${"$" + value.revenue}</td>
                <td>${(value.porcentaje / value.total).toFixed(2) + "%"}</td>
            </tr>
        `
})
    document.getElementById("upcoming").innerHTML = arrayPrint
}


const statisticsPast = () => {
    const currentDate = dataArray.currentDate
    const arrayPast = dataArray.events.filter(e => currentDate > e.date)

       // Map de los eventos del pasado

    const arrayPastByCategory = arrayPast.map(data => {
        const newObject = {
            category: data.category,
            revenue: data.price * data.assistance,
            porcentaje: (data.assistance * 100 / data.capacity).toFixed(0) 
        }
        return newObject
    })

    const arrayPastFiltered = (arr) => {
        
        return arr.reduce((acc, e) => {
            console.log(arr.filter(data => data.category === e.category).length)
            return {
                ...acc,
                [e.category]: {revenue: acc[e.category]  ? acc[e.category].revenue + e.revenue : e.revenue, 
                porcentaje: acc[e.category] ? ((acc[e.category].porcentaje) + Number(e.porcentaje)) : Number(e.porcentaje),
                total: arr.filter(data => data.category === e.category).length}
            }
        }, {})
    }

    const objectFiltered = arrayPastFiltered(arrayPastByCategory)

        //Imprimir categorias,revenues y porcentaje

        let arrayPrint = `
        <tr>
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of attendance</th>
           </tr>  
        `

        Object.entries(objectFiltered).forEach(([key, value]) => {
            arrayPrint += `
            <tr>
                <td>${key}</td>
                <td>${"$" + value.revenue}</td>
                <td>${(value.porcentaje / value.total).toFixed(2) + "%"}</td>
            </tr>
        `
        })

   document.getElementById("past").innerHTML = arrayPrint
}