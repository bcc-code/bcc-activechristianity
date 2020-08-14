export const getPostItemClickAction = (e: any) => {

    if (e.target.classList.contains('bookmark')) {
        return 'bookmark'
    } else {
        return 'postlink'
    }
}

const sizeChart = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280
}

export const getScreenSize = (width: number) => {

    if (width < sizeChart.sm) {
        return 'sm'
    } else if (width < sizeChart.md) {
        return 'md'
    } else if (width < sizeChart.lg) {
        return 'lg'
    } else {
        return 'xl'
    }
}
