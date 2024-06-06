const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { hashPassword } = require('../Helper/bcryptjs');

beforeAll(async () => {
    try {
        await queryInterface.bulkInsert('Users', [
            {
                username: "testing1",
                email: "testing1@mail.com",
                password: hashPassword("testing1123"),
                role: "Customer",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: "testing2",
                email: "testing2@mail.com",
                password: hashPassword("testing2123"),
                role: "Admin",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], null)

        await queryInterface.bulkInsert('Genres', [
            {
                "name": "Action",
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "name": "Romance",
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "name": "Comedy",
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ], null)

        await queryInterface.bulkInsert('Movies', [
            {
                "title": "Spider-Man: No Way Home",
                "synopsis": "Identitas Spider-Man sekarang sudah terungkap, dan Peter meminta bantuan Doctor Strange. namun sebuah kesalahan terjadi, dan itu justru mengundang musuh berbahaya dari dunia lain, mereka mulai bermunculan. Hal itu memaksa Peter mencari apa makna sebenarnya menjadi Spider-Man.",
                "trailerUrl": "https://www.youtube.com/watch?v=JfVOs4VSpmA&ab_channel=SonyPicturesEntertainment",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
                "rating": 8,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "You are The Apple of My Eye",
                "synopsis": "Ching-teng adalah siswa yang penuh perjuangan. Ketika kepala sekolah menempatkannya di samping Chia-yi, siswi yang cerdas dan cantik, keberuntungan dan perasaannya terhadap gadis itu pun berubah.",
                "trailerUrl": "https://www.youtube.com/watch?v=v5H6wE47FrI&ab_channel=20thCenturyStudiosHK",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BMWU2OTAyMTktMTU5MC00MTNhLTg1NzAtOTZjNWFjMDRiZGUxXkEyXkFqcGdeQXVyNDY3MzUxOTI@._V1_.jpg",
                "rating": 8,
                "genreId": 2,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Three Idiots",
                "synopsis": "Di kampus, Farhan dan Raju terlihat sangat akrab dengan Rancho. Bertahun-tahun kemudian, sebuah taruhan akhirnya memberi mereka kesempatan untuk mencari kembali teman yang telah lama hilang.",
                "trailerUrl": "https://www.youtube.com/watch?v=K0eDlFX9GMc&ab_channel=moviemaniacsDE",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                "rating": 7,
                "genreId": 3,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "John Wick",
                "synopsis": "Saat mantan pembunuh bayaran bernama John Wick baru saja kehilangan istrinya Helen karena penyakit kronis. Sebelum meninggal, Helen memberikan hadiah terakhir untuk John berupa seekor anak anjing bernama Daisy. Ia berharap, Daisy bisa membantu sang suami mengatasi kesedihannya.",
                "trailerUrl": "https://www.youtube.com/watch?v=C0BMx-qxsP4&ab_channel=MovieclipsTrailers",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg",
                "rating": 7,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Doctor Strange in the Multiverse of Madness",
                "synopsis": "Semua bermula saat Doctor Strange terus mengalami mimpi aneh. Salah satunya adalah saat dirinya sedang berusaha melarikan diri dari monster di sebuah semesta yang asing. Dalam mimpinya, ia bersama dengan seorang gadis, dan terlihat melewati pijakan yang terus berpindah untuk menghindar. Sampai di ujung jalan, mereka bertemu dengan benda mirip dengan The Book of Vishanti. Ia dihadapkan pada dilema, harus mengambil buku tersebut guna mengalahkan monster, atau menyelamatkan sang gadis kecil. Ia kemudian terbangun. Mimpi aneh terus ia alami, dan berbagai sosok muncul dari mimpinya yang berbeda-beda. Semua selalu berkaitan dengan dirinya pada satu dunia yang asing dan tak dikenali, menghadapi masalah, dan terus berlari.",
                "trailerUrl": "https://www.youtube.com/watch?v=aWzlQ2N6qqg&ab_channel=MarvelEntertainment",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg",
                "rating": 8,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Spider-Man: No Way Home",
                "synopsis": "Identitas Spider-Man sekarang sudah terungkap, dan Peter meminta bantuan Doctor Strange. namun sebuah kesalahan terjadi, dan itu justru mengundang musuh berbahaya dari dunia lain, mereka mulai bermunculan. Hal itu memaksa Peter mencari apa makna sebenarnya menjadi Spider-Man.",
                "trailerUrl": "https://www.youtube.com/watch?v=JfVOs4VSpmA&ab_channel=SonyPicturesEntertainment",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
                "rating": 8,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "You are The Apple of My Eye",
                "synopsis": "Ching-teng adalah siswa yang penuh perjuangan. Ketika kepala sekolah menempatkannya di samping Chia-yi, siswi yang cerdas dan cantik, keberuntungan dan perasaannya terhadap gadis itu pun berubah.",
                "trailerUrl": "https://www.youtube.com/watch?v=v5H6wE47FrI&ab_channel=20thCenturyStudiosHK",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BMWU2OTAyMTktMTU5MC00MTNhLTg1NzAtOTZjNWFjMDRiZGUxXkEyXkFqcGdeQXVyNDY3MzUxOTI@._V1_.jpg",
                "rating": 8,
                "genreId": 2,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Three Idiots",
                "synopsis": "Di kampus, Farhan dan Raju terlihat sangat akrab dengan Rancho. Bertahun-tahun kemudian, sebuah taruhan akhirnya memberi mereka kesempatan untuk mencari kembali teman yang telah lama hilang.",
                "trailerUrl": "https://www.youtube.com/watch?v=K0eDlFX9GMc&ab_channel=moviemaniacsDE",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                "rating": 7,
                "genreId": 3,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "John Wick",
                "synopsis": "Saat mantan pembunuh bayaran bernama John Wick baru saja kehilangan istrinya Helen karena penyakit kronis. Sebelum meninggal, Helen memberikan hadiah terakhir untuk John berupa seekor anak anjing bernama Daisy. Ia berharap, Daisy bisa membantu sang suami mengatasi kesedihannya.",
                "trailerUrl": "https://www.youtube.com/watch?v=C0BMx-qxsP4&ab_channel=MovieclipsTrailers",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg",
                "rating": 7,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Doctor Strange in the Multiverse of Madness",
                "synopsis": "Semua bermula saat Doctor Strange terus mengalami mimpi aneh. Salah satunya adalah saat dirinya sedang berusaha melarikan diri dari monster di sebuah semesta yang asing. Dalam mimpinya, ia bersama dengan seorang gadis, dan terlihat melewati pijakan yang terus berpindah untuk menghindar. Sampai di ujung jalan, mereka bertemu dengan benda mirip dengan The Book of Vishanti. Ia dihadapkan pada dilema, harus mengambil buku tersebut guna mengalahkan monster, atau menyelamatkan sang gadis kecil. Ia kemudian terbangun. Mimpi aneh terus ia alami, dan berbagai sosok muncul dari mimpinya yang berbeda-beda. Semua selalu berkaitan dengan dirinya pada satu dunia yang asing dan tak dikenali, menghadapi masalah, dan terus berlari.",
                "trailerUrl": "https://www.youtube.com/watch?v=aWzlQ2N6qqg&ab_channel=MarvelEntertainment",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg",
                "rating": 8,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Spider-Man: No Way Home",
                "synopsis": "Identitas Spider-Man sekarang sudah terungkap, dan Peter meminta bantuan Doctor Strange. namun sebuah kesalahan terjadi, dan itu justru mengundang musuh berbahaya dari dunia lain, mereka mulai bermunculan. Hal itu memaksa Peter mencari apa makna sebenarnya menjadi Spider-Man.",
                "trailerUrl": "https://www.youtube.com/watch?v=JfVOs4VSpmA&ab_channel=SonyPicturesEntertainment",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
                "rating": 8,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "You are The Apple of My Eye",
                "synopsis": "Ching-teng adalah siswa yang penuh perjuangan. Ketika kepala sekolah menempatkannya di samping Chia-yi, siswi yang cerdas dan cantik, keberuntungan dan perasaannya terhadap gadis itu pun berubah.",
                "trailerUrl": "https://www.youtube.com/watch?v=v5H6wE47FrI&ab_channel=20thCenturyStudiosHK",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BMWU2OTAyMTktMTU5MC00MTNhLTg1NzAtOTZjNWFjMDRiZGUxXkEyXkFqcGdeQXVyNDY3MzUxOTI@._V1_.jpg",
                "rating": 8,
                "genreId": 2,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Three Idiots",
                "synopsis": "Di kampus, Farhan dan Raju terlihat sangat akrab dengan Rancho. Bertahun-tahun kemudian, sebuah taruhan akhirnya memberi mereka kesempatan untuk mencari kembali teman yang telah lama hilang.",
                "trailerUrl": "https://www.youtube.com/watch?v=K0eDlFX9GMc&ab_channel=moviemaniacsDE",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                "rating": 7,
                "genreId": 3,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "John Wick",
                "synopsis": "Saat mantan pembunuh bayaran bernama John Wick baru saja kehilangan istrinya Helen karena penyakit kronis. Sebelum meninggal, Helen memberikan hadiah terakhir untuk John berupa seekor anak anjing bernama Daisy. Ia berharap, Daisy bisa membantu sang suami mengatasi kesedihannya.",
                "trailerUrl": "https://www.youtube.com/watch?v=C0BMx-qxsP4&ab_channel=MovieclipsTrailers",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg",
                "rating": 7,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Doctor Strange in the Multiverse of Madness",
                "synopsis": "Semua bermula saat Doctor Strange terus mengalami mimpi aneh. Salah satunya adalah saat dirinya sedang berusaha melarikan diri dari monster di sebuah semesta yang asing. Dalam mimpinya, ia bersama dengan seorang gadis, dan terlihat melewati pijakan yang terus berpindah untuk menghindar. Sampai di ujung jalan, mereka bertemu dengan benda mirip dengan The Book of Vishanti. Ia dihadapkan pada dilema, harus mengambil buku tersebut guna mengalahkan monster, atau menyelamatkan sang gadis kecil. Ia kemudian terbangun. Mimpi aneh terus ia alami, dan berbagai sosok muncul dari mimpinya yang berbeda-beda. Semua selalu berkaitan dengan dirinya pada satu dunia yang asing dan tak dikenali, menghadapi masalah, dan terus berlari.",
                "trailerUrl": "https://www.youtube.com/watch?v=aWzlQ2N6qqg&ab_channel=MarvelEntertainment",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg",
                "rating": 8,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Spider-Man: No Way Home",
                "synopsis": "Identitas Spider-Man sekarang sudah terungkap, dan Peter meminta bantuan Doctor Strange. namun sebuah kesalahan terjadi, dan itu justru mengundang musuh berbahaya dari dunia lain, mereka mulai bermunculan. Hal itu memaksa Peter mencari apa makna sebenarnya menjadi Spider-Man.",
                "trailerUrl": "https://www.youtube.com/watch?v=JfVOs4VSpmA&ab_channel=SonyPicturesEntertainment",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
                "rating": 8,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "You are The Apple of My Eye",
                "synopsis": "Ching-teng adalah siswa yang penuh perjuangan. Ketika kepala sekolah menempatkannya di samping Chia-yi, siswi yang cerdas dan cantik, keberuntungan dan perasaannya terhadap gadis itu pun berubah.",
                "trailerUrl": "https://www.youtube.com/watch?v=v5H6wE47FrI&ab_channel=20thCenturyStudiosHK",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BMWU2OTAyMTktMTU5MC00MTNhLTg1NzAtOTZjNWFjMDRiZGUxXkEyXkFqcGdeQXVyNDY3MzUxOTI@._V1_.jpg",
                "rating": 8,
                "genreId": 2,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Three Idiots",
                "synopsis": "Di kampus, Farhan dan Raju terlihat sangat akrab dengan Rancho. Bertahun-tahun kemudian, sebuah taruhan akhirnya memberi mereka kesempatan untuk mencari kembali teman yang telah lama hilang.",
                "trailerUrl": "https://www.youtube.com/watch?v=K0eDlFX9GMc&ab_channel=moviemaniacsDE",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                "rating": 7,
                "genreId": 3,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "John Wick",
                "synopsis": "Saat mantan pembunuh bayaran bernama John Wick baru saja kehilangan istrinya Helen karena penyakit kronis. Sebelum meninggal, Helen memberikan hadiah terakhir untuk John berupa seekor anak anjing bernama Daisy. Ia berharap, Daisy bisa membantu sang suami mengatasi kesedihannya.",
                "trailerUrl": "https://www.youtube.com/watch?v=C0BMx-qxsP4&ab_channel=MovieclipsTrailers",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg",
                "rating": 7,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            },
            {
                "title": "Doctor Strange in the Multiverse of Madness",
                "synopsis": "Semua bermula saat Doctor Strange terus mengalami mimpi aneh. Salah satunya adalah saat dirinya sedang berusaha melarikan diri dari monster di sebuah semesta yang asing. Dalam mimpinya, ia bersama dengan seorang gadis, dan terlihat melewati pijakan yang terus berpindah untuk menghindar. Sampai di ujung jalan, mereka bertemu dengan benda mirip dengan The Book of Vishanti. Ia dihadapkan pada dilema, harus mengambil buku tersebut guna mengalahkan monster, atau menyelamatkan sang gadis kecil. Ia kemudian terbangun. Mimpi aneh terus ia alami, dan berbagai sosok muncul dari mimpinya yang berbeda-beda. Semua selalu berkaitan dengan dirinya pada satu dunia yang asing dan tak dikenali, menghadapi masalah, dan terus berlari.",
                "trailerUrl": "https://www.youtube.com/watch?v=aWzlQ2N6qqg&ab_channel=MarvelEntertainment",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg",
                "rating": 8,
                "genreId": 1,
                "authorId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "status": "active"
            }
        ], null)

        await queryInterface.bulkInsert('Favorites', [
            {
                "userId": 1,
                "movieId": 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "userId": 1,
                "movieId": 3,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "userId": 2,
                "movieId": 2,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "userId": 2,
                "movieId": 4,
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ], null)
    } catch (error) {
        expect(error).toBeInstanceOf(Object);
    }
})

afterAll(async () => {
    try {
        await queryInterface.bulkDelete('Users', {}, { truncate: true, restartIdentity: true })

        await queryInterface.bulkDelete('Genres', {}, { truncate: true, restartIdentity: true })

        await queryInterface.bulkDelete('Movies', {}, { truncate: true, restartIdentity: true })

        await queryInterface.bulkDelete('Favorites', {}, { truncate: true, restartIdentity: true })
    } catch (error) {
        expect(error).toBeInstanceOf(Object);
    }
})
    
describe('POST /publics/register', () => {
    describe('Registration test successful', () => {
        it('Successfully registered', () => {
            const data = { username: 'salwa', email: 'salwa@mail.com', role: "Staff", password: 'salwa123' }

            return request(app)
                .post('/publics/register')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(201)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.body).toHaveProperty('id', expect.any(String))
                    expect(response.body).toHaveProperty('email', expect.any(String))
                })
        })
    })

    describe('Registration test failed', () => {
        it('Email not given / not input', () => {
            const data = { username: 'testing', password: 'testing123' }

            return request(app)
                .post('/publics/register')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(Array))
                })
        })

        it('Password not given / not input', () => {
            const data = { username: 'testing', email: 'testing1@mail.com' }

            return request(app)
                .post('/publics/register')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(Array))
                })
        })

        it('Email is given an empty string', () => {
            const data = { username: 'testing', email: ' ', password: 'testing123' }

            return request(app)
                .post('/publics/register')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(Array))
                })
        })

        it('Password is given an empty string', () => {
            const data = { username: 'testing', email: 'testing1@mail.com', password: ' ' }

            return request(app)
                .post('/publics/register')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(Array))
                })
        })

        it('Email already registered', () => {
            const data = { username: 'testing', email: 'testing1@mail.com', password: 'testing1123' }

            return request(app)
                .post('/publics/register')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(Array))
                })
        })

        it('Email format is wrong / invalid', () => {
            const data = { username: 'testing', email: 'testingmailcom', password: 'testing123' }

            return request(app)
                .post('/publics/register')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(Array))
                })
        })
    })
})

describe('POST /publics/login', () => {
    describe('Login test successful', () => {
        it('Login successfully', () => {
            const data = { email: 'testing1@mail.com', password: 'testing1123' }

            return request(app)
                .post('/publics/login')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.body).toHaveProperty('access_token', expect.any(String))
                })
        })
    })

    describe('Login test failed', () => {
        it('Provided wrong password', () => {
            const data = { email: 'testing1@mail.com', password: '123' }

            return request(app)
                .post('/publics/login')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                })
        })

        it('The entered email is not registered in the database', () => {
            const data = { email: 'testing123@mail.com', password: 'testing123' }

            return request(app)
                .post('/publics/login')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                })
        })
    })
})

describe('GET /publics/movies', () => {
    describe('Successfully got Main Entity', () => {
        it('Successfully got Primary Entity (either without) without using query filter parameter', () => {

            return request(app)
                .get('/publics/movies')
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.body).toHaveProperty('data', expect.any(Object))
                    expect(response.body.data).toHaveProperty('totalItems', expect.any(Number))
                    expect(response.body.data).toHaveProperty('movies', expect.any(Array))
                    expect(response.body.data).toHaveProperty('totalPages', expect.any(Number))
                    expect(response.body.data).toHaveProperty('currentPage', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('id', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('title', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('synopsis', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('trailerUrl', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('imgUrl', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('rating', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('genreId', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('status', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('authorId', expect.any(Number))
                })
        })

        it('Successfully got Primary Entity (either without) with 1 query filter parameter', () => {

            return request(app)
                .get('/publics/movies?title=spider')
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.body).toHaveProperty('data', expect.any(Object))
                    expect(response.body.data).toHaveProperty('totalItems', expect.any(Number))
                    expect(response.body.data).toHaveProperty('movies', expect.any(Array))
                    expect(response.body.data).toHaveProperty('totalPages', expect.any(Number))
                    expect(response.body.data).toHaveProperty('currentPage', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('id', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('title', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('synopsis', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('trailerUrl', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('imgUrl', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('rating', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('genreId', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('status', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('authorId', expect.any(Number))
                })
        })

        it('Managed to get Main Entity and appropriate length(either without) when giving certain page(check pagination)', () => {

            return request(app)
                .get('/publics/movies?page=2&size=9')
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.body).toHaveProperty('data', expect.any(Object))
                    expect(response.body.data).toHaveProperty('totalItems', expect.any(Number))
                    expect(response.body.data).toHaveProperty('movies', expect.any(Array))
                    expect(response.body.data).toHaveProperty('totalPages', expect.any(Number))
                    expect(response.body.data).toHaveProperty('currentPage', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('id', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('title', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('synopsis', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('trailerUrl', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('imgUrl', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('rating', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('genreId', expect.any(Number))
                    expect(response.body.data.movies[0]).toHaveProperty('status', expect.any(String))
                    expect(response.body.data.movies[0]).toHaveProperty('authorId', expect.any(Number))
                })
        })

        it('Managed to get 1 Main Entity according to the given id params', () => {

            return request(app)
                .get('/publics/movies/1')
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.body).toHaveProperty('movie', expect.any(Object))
                    expect(response.body.movie).toHaveProperty('id', expect.any(Number))
                    expect(response.body.movie).toHaveProperty('title', expect.any(String))
                    expect(response.body.movie).toHaveProperty('synopsis', expect.any(String))
                    expect(response.body.movie).toHaveProperty('trailerUrl', expect.any(String))
                    expect(response.body.movie).toHaveProperty('imgUrl', expect.any(String))
                    expect(response.body.movie).toHaveProperty('rating', expect.any(Number))
                    expect(response.body.movie).toHaveProperty('genreId', expect.any(Number))
                    expect(response.body.movie).toHaveProperty('status', expect.any(String))
                    expect(response.body.movie).toHaveProperty('authorId', expect.any(Number))
                })
        })
    })

    describe('Failed got Main Entity', () => {
        it('Failed to get Main Entity because given params id is not in database / invalid', () => {

            return request(app)
                .get('/publics/movies/30')
                .then((response) => {
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                })
        })
    })
})

describe('POST /publics/favorites', () => {
    describe('Bookmark test successful', () => {
        it('Successfully got a list of bookmarks / favorites according to the logged in user', () => {
            const data = { email: 'testing1@mail.com', password: 'testing1123' }
            let access_token;
            return request(app)
                .post('/publics/login')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.body).toHaveProperty('access_token', expect.any(String))
                    access_token = response.body.access_token
                })
                .then(() => {
                    return request(app)
                    .get('/publics/favorites')
                    .set("access_token", access_token)
                    .then((response) => {
                        expect(response.status).toBe(200)
                        expect(response.body).toBeInstanceOf(Object)
                        expect(response.body).toHaveProperty('message', expect.any(String))
                        expect(response.body).toHaveProperty('favorites', expect.any(Object))
                        expect(response.body.favorites[0]).toHaveProperty('id', expect.any(Number))
                        expect(response.body.favorites[0]).toHaveProperty('userId', expect.any(Number))
                        expect(response.body.favorites[0]).toHaveProperty('movieId', expect.any(Number))
                        expect(response.body.favorites[0].Movie).toHaveProperty('id', expect.any(Number))
                        expect(response.body.favorites[0].Movie).toHaveProperty('title', expect.any(String))
                        expect(response.body.favorites[0].Movie).toHaveProperty('synopsis', expect.any(String))
                        expect(response.body.favorites[0].Movie).toHaveProperty('trailerUrl', expect.any(String))
                        expect(response.body.favorites[0].Movie).toHaveProperty('imgUrl', expect.any(String))
                        expect(response.body.favorites[0].Movie).toHaveProperty('rating', expect.any(Number))
                        expect(response.body.favorites[0].Movie).toHaveProperty('genreId', expect.any(Number))
                        expect(response.body.favorites[0].Movie).toHaveProperty('status', expect.any(String))
                        expect(response.body.favorites[0].Movie).toHaveProperty('authorId', expect.any(Number))
                    })
                })
        })
    
        it('Successfully added bookmark with matching id', () => {
            const data = { email: 'testing1@mail.com', password: 'testing1123' }
            let access_token;
            return request(app)
                .post('/publics/login')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.body).toHaveProperty('access_token', expect.any(String))
                    access_token = response.body.access_token
                })
                .then(() => {
                    return request(app)
                        .post('/publics/favorites/5')
                        .set("access_token", access_token)
                        .then((response) => {
                            expect(response.status).toBe(201)
                            expect(response.body).toBeInstanceOf(Object)
                            expect(response.body).toHaveProperty('message', expect.any(String))
                            expect(response.body).toHaveProperty('favorite', expect.any(Object))
                            expect(response.body.favorite).toHaveProperty('id', expect.any(Number))
                            expect(response.body.favorite).toHaveProperty('userId', expect.any(Number))
                            expect(response.body.favorite).toHaveProperty('movieId', expect.any(Number))
                    })
                })
        })
    })

    describe('Bookmark test failed', () => {
        it('Failed to add bookmark because the entity id that was sent is not in the database', () => {
            const data = { email: 'testing1@mail.com', password: 'testing1123' }
            let access_token;
            return request(app)
                .post('/publics/login')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.body).toHaveProperty('access_token', expect.any(String))
                    access_token = response.body.access_token
                })
                .then(() => {
                    return request(app)
                        .post('/publics/favorites/50')
                        .set("access_token", access_token)
                        .then((response) => {
                            expect(response.status).toBe(404)
                            expect(response.body).toBeInstanceOf(Object)
                            expect(response.body).toHaveProperty('message', expect.any(String))
                    })
                })
        })

        it('Failed to get a list of bookmarks / favorites because they are not logged in', () => {
            const access_token = null;
            return request(app)
                .post('/publics/favorites/50')
                .set("access_token", access_token)
                .then((response) => {
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it('Failed to get a list of bookmarks / favorites because the token given is not a "customer" role but staff / admin', () => {
            const data = { email: 'testing2@mail.com', password: 'testing2123' }
            let access_token;
            return request(app)
                .post('/publics/login')
                .send(data)
                .then((response) => {
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.body).toHaveProperty('access_token', expect.any(String))
                    access_token = response.body.access_token
                })
                .then(() => {
                    return request(app)
                        .get('/publics/favorites')
                        .set("access_token", access_token)
                        .then((response) => {
                            expect(response.status).toBe(403)
                            expect(response.body).toBeInstanceOf(Object)
                            expect(response.body).toHaveProperty('message', expect.any(String))
                    })
                })
        })
    })
})
