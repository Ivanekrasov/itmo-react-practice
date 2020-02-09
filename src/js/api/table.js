export const getNasaData = () => Promise.resolve({ json: () => Promise.resolve(nasaData)});
const nasaData = {
    headers: [ 'Name', 'SOL', 'Camera', 'Rover name', 'Status'],
    table: [
        {
            info: ['Mars1', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars2', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars3', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars4', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars5', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars6', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars7', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars8', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars9', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars10', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars11', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars12', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars13', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars14', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars15', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars16', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars17', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars18', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars19', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars20', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
        {
            info: ['Mars21', 'some_sol', 'some_camera', 'some_rover_name', 'some_status'],
            url: 'some_url'
        },
    ]
}