import com.codingfeline.buildkonfig.compiler.FieldSpec.Type.STRING
import org.jetbrains.kotlin.konan.properties.Properties

buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.0")
        classpath("com.codingfeline.buildkonfig:buildkonfig-gradle-plugin:0.15.1")
    }
}

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidLibrary)
    id("io.realm.kotlin") version "1.11.0"
    id("com.codingfeline.buildkonfig") version "0.15.1"
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
            implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.6.0-RC.2")
            implementation("com.raedghazal:kotlinx_datetime_ext:1.2.0")
            implementation("io.github.jan-tennert.supabase:postgrest-kt:2.3.1")
        }

        iosMain.dependencies {
            implementation("io.ktor:ktor-client-darwin:2.3.8")
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

buildkonfig {
    packageName = "com.lnk0.naia"

    val props = Properties()
    props.load(file("key.properties").inputStream())

    defaultConfigs {
        buildConfigField(
            STRING,
            "SUPABASE_URL",
            props["supabase_url"]?.toString() ?: "http://fake.backend.url"
        )
        buildConfigField(
            STRING,
            "SUPABASE_SECRET",
            props["supabase_secret"]?.toString() ?: "fakesecret"
        )
    }
}