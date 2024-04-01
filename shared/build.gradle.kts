plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidLibrary)
    id("io.realm.kotlin") version "1.11.0"
}

kotlin {
    androidTarget {
        compilations.all {
            kotlinOptions {
                jvmTarget = "11"
            }
        }
    }

    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            baseName = "Shared"
            isStatic = true
            export("com.arkivanov.decompose:decompose:2.2.2")
            export("com.arkivanov.essenty:lifecycle:1.3.0")
        }
    }

    sourceSets {
        commonMain.dependencies {
            // put your Multiplatform dependencies here
            implementation("io.realm.kotlin:library-base:1.11.0")
            implementation("io.realm.kotlin:library-sync:1.11.0") // If using Device Sync
            implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.0") // If using coroutines with the SDK
            implementation("com.arkivanov.decompose:decompose:2.2.2")
            implementation("com.arkivanov.essenty:lifecycle:1.3.0")
            api("com.arkivanov.decompose:decompose:2.2.2")
            api("com.arkivanov.essenty:lifecycle:1.3.0")
        }
    }
}

android {
    namespace = "org.naia.app.shared"
    compileSdk = libs.versions.android.compileSdk.get().toInt()
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    defaultConfig {
        minSdk = libs.versions.android.minSdk.get().toInt()
    }
}
